import { supabase } from '../lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

export class BaseService {
  protected tableName: string;
  protected supabase = supabase;
  private subscriptions: Map<string, RealtimeChannel> = new Map();

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  protected async getUserId(): Promise<string> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
    return user.id;
  }

  async getAll<T>(orderBy: string = 'created_at', ascending: boolean = false): Promise<T[]> {
    const userId = await this.getUserId();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .order(orderBy, { ascending });

    if (error) throw error;
    return data as T[];
  }

  async getById<T>(id: string): Promise<T | null> {
    const userId = await this.getUserId();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data as T | null;
  }

  async create<T>(record: Partial<T>): Promise<T> {
    const userId = await this.getUserId();
    const { data, error } = await supabase
      .from(this.tableName)
      .insert({ ...record, user_id: userId })
      .select()
      .single();

    if (error) throw error;
    return data as T;
  }

  async update<T>(id: string, updates: Partial<T>): Promise<T> {
    const userId = await this.getUserId();
    const { data, error } = await supabase
      .from(this.tableName)
      .update(updates)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data as T;
  }

  async delete(id: string): Promise<void> {
    const userId = await this.getUserId();
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
  }

  async query<T>(filters: Record<string, any>, orderBy?: string, ascending: boolean = false): Promise<T[]> {
    const userId = await this.getUserId();
    let query = supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId);

    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    if (orderBy) {
      query = query.order(orderBy, { ascending });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as T[];
  }

  subscribe<T>(
    callback: (payload: { eventType: 'INSERT' | 'UPDATE' | 'DELETE'; new: T; old: T }) => void,
    filter?: string
  ): () => void {
    const subscriptionKey = `${this.tableName}_${Date.now()}`;

    const channel = supabase
      .channel(subscriptionKey)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: this.tableName,
          filter: filter,
        },
        (payload: any) => {
          callback({
            eventType: payload.eventType,
            new: payload.new as T,
            old: payload.old as T,
          });
        }
      )
      .subscribe();

    this.subscriptions.set(subscriptionKey, channel);

    return () => {
      const channel = this.subscriptions.get(subscriptionKey);
      if (channel) {
        supabase.removeChannel(channel);
        this.subscriptions.delete(subscriptionKey);
      }
    };
  }

  unsubscribeAll(): void {
    this.subscriptions.forEach((channel) => {
      supabase.removeChannel(channel);
    });
    this.subscriptions.clear();
  }
}
