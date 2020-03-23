import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
}

export interface Message {
  name: Scalars['String'],
  text: Scalars['String'],
  postedAt: Scalars['String'],
}

export interface Mutation {
  addMessage?: Maybe<Scalars['Boolean']>,
  addRoom?: Maybe<Room>,
}


export interface MutationAddMessageArgs {
  roomId: Scalars['String'],
  name: Scalars['String'],
  text: Scalars['String']
}


export interface MutationAddRoomArgs {
  name: Scalars['String']
}

export interface Query {
  rooms?: Maybe<Array<Maybe<Room>>>,
  room?: Maybe<Room>,
}


export interface QueryRoomArgs {
  id: Scalars['String']
}

export interface Room {
  id: Scalars['String'],
  name: Scalars['String'],
  messages: Array<Maybe<Message>>,
  createdAt: Scalars['String'],
}

export type AddMessageMutationVariables = {
  roomId: Scalars['String'],
  name: Scalars['String'],
  text: Scalars['String']
};


export type AddMessageMutation = Pick<Mutation, 'addMessage'>;

export type AddRoomMutationVariables = {
  name: Scalars['String']
};


export type AddRoomMutation = { addRoom: Maybe<(
    Pick<Room, 'id' | 'name' | 'createdAt'>
    & { messages: Array<Maybe<Pick<Message, 'name' | 'text' | 'postedAt'>>> }
  )> };

export type RoomQueryVariables = {
  id: Scalars['String']
};


export type RoomQuery = { room: Maybe<(
    Pick<Room, 'id' | 'name' | 'createdAt'>
    & { messages: Array<Maybe<Pick<Message, 'name' | 'text' | 'postedAt'>>> }
  )> };

export type RoomsQueryVariables = {};


export type RoomsQuery = { rooms: Maybe<Array<Maybe<(
    Pick<Room, 'id' | 'name' | 'createdAt'>
    & { messages: Array<Maybe<Pick<Message, 'name' | 'text' | 'postedAt'>>> }
  )>>> };



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Room: ResolverTypeWrapper<Room>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Message: ResolverTypeWrapper<Message>,
  Mutation: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Room: Room,
  String: Scalars['String'],
  Message: Message,
  Mutation: {},
  Boolean: Scalars['Boolean'],
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  postedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addMessage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddMessageArgs, 'roomId' | 'name' | 'text'>>,
  addRoom?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType, RequireFields<MutationAddRoomArgs, 'name'>>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  rooms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Room']>>>, ParentType, ContextType>,
  room?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType, RequireFields<QueryRoomArgs, 'id'>>,
};

export type RoomResolvers<ContextType = any, ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  messages?: Resolver<Array<Maybe<ResolversTypes['Message']>>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = any> = {
  Message?: MessageResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Room?: RoomResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
