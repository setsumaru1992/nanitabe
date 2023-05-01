import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ISO8601Date: any;
};

/** Autogenerated input type of AddDish */
export type AddDishInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  dish: DishForCreate;
};

/** Autogenerated return type of AddDish. */
export type AddDishPayload = {
  __typename?: 'AddDishPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  dishId: Scalars['Int'];
};

/** Autogenerated input type of AddMealWithExistingDish */
export type AddMealWithExistingDishInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  dishId: Scalars['Int'];
  meal: MealForCreate;
};

/** Autogenerated return type of AddMealWithExistingDish. */
export type AddMealWithExistingDishPayload = {
  __typename?: 'AddMealWithExistingDishPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  mealId: Scalars['Int'];
};

/** Autogenerated input type of AddMealWithNewDishAndNewSource */
export type AddMealWithNewDishAndNewSourceInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  dish: DishForCreate;
  meal: MealForCreate;
};

/** Autogenerated return type of AddMealWithNewDishAndNewSource. */
export type AddMealWithNewDishAndNewSourcePayload = {
  __typename?: 'AddMealWithNewDishAndNewSourcePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  dishId: Scalars['Int'];
  mealId: Scalars['Int'];
};

export type Authenticatable = {
  __typename?: 'Authenticatable';
  email: Scalars['String'];
};

export type Credential = {
  __typename?: 'Credential';
  accessToken: Scalars['String'];
  client: Scalars['String'];
  expiry: Scalars['Int'];
  tokenType: Scalars['String'];
  uid: Scalars['String'];
};

export type Dish = DishFields & {
  __typename?: 'Dish';
  comment?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  mealPosition: Scalars['Int'];
  name: Scalars['String'];
};

export type DishFields = {
  comment?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  mealPosition: Scalars['Int'];
  name: Scalars['String'];
};

export type DishForCreate = {
  comment?: InputMaybe<Scalars['String']>;
  mealPosition: Scalars['Int'];
  name: Scalars['String'];
};

export type DishRegisteredWithMeal = DishFields & {
  __typename?: 'DishRegisteredWithMeal';
  comment?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  mealPosition: Scalars['Int'];
  name: Scalars['String'];
};

export type DishesForDisplayWithSource = {
  __typename?: 'DishesForDisplayWithSource';
  dishesPerMealPosition: Array<DishesPerMealPosition>;
  sourceId?: Maybe<Scalars['Int']>;
};

export type DishesPerMealPosition = {
  __typename?: 'DishesPerMealPosition';
  dishes: Array<Dish>;
  mealPosition?: Maybe<Scalars['Int']>;
};

/** Autogenerated return type of LoginUserConfirmRegistrationWithToken. */
export type LoginUserConfirmRegistrationWithTokenPayload = {
  __typename?: 'LoginUserConfirmRegistrationWithTokenPayload';
  authenticatable: Authenticatable;
  /** Authentication credentials. Null unless user is signed in after confirmation. */
  credentials?: Maybe<Credential>;
};

/** Autogenerated return type of LoginUserLogin. */
export type LoginUserLoginPayload = {
  __typename?: 'LoginUserLoginPayload';
  authenticatable: Authenticatable;
  credentials: Credential;
};

/** Autogenerated return type of LoginUserLogout. */
export type LoginUserLogoutPayload = {
  __typename?: 'LoginUserLogoutPayload';
  authenticatable: Authenticatable;
};

/** Autogenerated return type of LoginUserRegister. */
export type LoginUserRegisterPayload = {
  __typename?: 'LoginUserRegisterPayload';
  /** Authentication credentials. Null if after signUp resource is not active for authentication (e.g. Email confirmation required). */
  credentials?: Maybe<Credential>;
};

/** Autogenerated return type of LoginUserResendConfirmationWithToken. */
export type LoginUserResendConfirmationWithTokenPayload = {
  __typename?: 'LoginUserResendConfirmationWithTokenPayload';
  message: Scalars['String'];
};

/** Autogenerated return type of LoginUserSendPasswordResetWithToken. */
export type LoginUserSendPasswordResetWithTokenPayload = {
  __typename?: 'LoginUserSendPasswordResetWithTokenPayload';
  message: Scalars['String'];
};

/** Autogenerated return type of LoginUserUpdatePasswordWithToken. */
export type LoginUserUpdatePasswordWithTokenPayload = {
  __typename?: 'LoginUserUpdatePasswordWithTokenPayload';
  authenticatable: Authenticatable;
  /** Authentication credentials. Resource must be signed_in for credentials to be returned. */
  credentials?: Maybe<Credential>;
};

export type MealFields = {
  comment?: Maybe<Scalars['String']>;
  date: Scalars['ISO8601Date'];
  dish: Dish;
  id: Scalars['Int'];
  mealType: Scalars['Int'];
};

export type MealForCalender = MealFields & {
  __typename?: 'MealForCalender';
  comment?: Maybe<Scalars['String']>;
  date: Scalars['ISO8601Date'];
  dish: Dish;
  id: Scalars['Int'];
  mealType: Scalars['Int'];
};

export type MealForCreate = {
  comment?: InputMaybe<Scalars['String']>;
  date: Scalars['ISO8601Date'];
  mealType: Scalars['Int'];
};

export type MealForUpdate = {
  comment?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['ISO8601Date']>;
  id: Scalars['Int'];
  mealType?: InputMaybe<Scalars['Int']>;
};

export type MealsOfDate = {
  __typename?: 'MealsOfDate';
  date: Scalars['ISO8601Date'];
  meals: Array<MealForCalender>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addDish?: Maybe<AddDishPayload>;
  addMealWithExistingDish?: Maybe<AddMealWithExistingDishPayload>;
  addMealWithNewDishAndNewSource?: Maybe<AddMealWithNewDishAndNewSourcePayload>;
  loginUserConfirmRegistrationWithToken?: Maybe<LoginUserConfirmRegistrationWithTokenPayload>;
  loginUserLogin?: Maybe<LoginUserLoginPayload>;
  loginUserLogout?: Maybe<LoginUserLogoutPayload>;
  loginUserRegister?: Maybe<LoginUserRegisterPayload>;
  loginUserResendConfirmationWithToken?: Maybe<LoginUserResendConfirmationWithTokenPayload>;
  loginUserSendPasswordResetWithToken?: Maybe<LoginUserSendPasswordResetWithTokenPayload>;
  loginUserUpdatePasswordWithToken?: Maybe<LoginUserUpdatePasswordWithTokenPayload>;
  removeMeal?: Maybe<RemoveMealPayload>;
  updateMealWithExistingDish?: Maybe<UpdateMealWithExistingDishPayload>;
  updateMealWithNewDishAndNewSource?: Maybe<UpdateMealWithNewDishAndNewSourcePayload>;
};


export type MutationAddDishArgs = {
  input: AddDishInput;
};


export type MutationAddMealWithExistingDishArgs = {
  input: AddMealWithExistingDishInput;
};


export type MutationAddMealWithNewDishAndNewSourceArgs = {
  input: AddMealWithNewDishAndNewSourceInput;
};


export type MutationLoginUserConfirmRegistrationWithTokenArgs = {
  confirmationToken: Scalars['String'];
};


export type MutationLoginUserLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginUserRegisterArgs = {
  confirmUrl?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationLoginUserResendConfirmationWithTokenArgs = {
  confirmUrl: Scalars['String'];
  email: Scalars['String'];
};


export type MutationLoginUserSendPasswordResetWithTokenArgs = {
  email: Scalars['String'];
  redirectUrl: Scalars['String'];
};


export type MutationLoginUserUpdatePasswordWithTokenArgs = {
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
  resetPasswordToken: Scalars['String'];
};


export type MutationRemoveMealArgs = {
  input: RemoveMealInput;
};


export type MutationUpdateMealWithExistingDishArgs = {
  input: UpdateMealWithExistingDishInput;
};


export type MutationUpdateMealWithNewDishAndNewSourceArgs = {
  input: UpdateMealWithNewDishAndNewSourceInput;
};

export type Query = {
  __typename?: 'Query';
  dishes: Array<DishRegisteredWithMeal>;
  dishesPerSource: Array<DishesForDisplayWithSource>;
  mealsForCalender: Array<MealsOfDate>;
  /** An example field added by the generator */
  testField: Scalars['String'];
};


export type QueryDishesArgs = {
  searchString?: InputMaybe<Scalars['String']>;
};


export type QueryMealsForCalenderArgs = {
  startDate: Scalars['ISO8601Date'];
};

/** Autogenerated input type of RemoveMeal */
export type RemoveMealInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  mealId: Scalars['Int'];
};

/** Autogenerated return type of RemoveMeal. */
export type RemoveMealPayload = {
  __typename?: 'RemoveMealPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  mealId: Scalars['Int'];
};

/** Autogenerated input type of UpdateMealWithExistingDish */
export type UpdateMealWithExistingDishInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  dishId?: InputMaybe<Scalars['Int']>;
  meal: MealForUpdate;
};

/** Autogenerated return type of UpdateMealWithExistingDish. */
export type UpdateMealWithExistingDishPayload = {
  __typename?: 'UpdateMealWithExistingDishPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  mealId: Scalars['Int'];
};

/** Autogenerated input type of UpdateMealWithNewDishAndNewSource */
export type UpdateMealWithNewDishAndNewSourceInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  dish: DishForCreate;
  meal: MealForUpdate;
};

/** Autogenerated return type of UpdateMealWithNewDishAndNewSource. */
export type UpdateMealWithNewDishAndNewSourcePayload = {
  __typename?: 'UpdateMealWithNewDishAndNewSourcePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  dishId: Scalars['Int'];
  mealId: Scalars['Int'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', loginUserLogin?: { __typename?: 'LoginUserLoginPayload', credentials: { __typename?: 'Credential', uid: string } } | null };

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', loginUserRegister?: { __typename?: 'LoginUserRegisterPayload', credentials?: { __typename?: 'Credential', accessToken: string } | null } | null };

export type AddDishMutationVariables = Exact<{
  dish: DishForCreate;
}>;


export type AddDishMutation = { __typename?: 'Mutation', addDish?: { __typename?: 'AddDishPayload', dishId: number } | null };

export type DishesQueryVariables = Exact<{
  searchString?: InputMaybe<Scalars['String']>;
}>;


export type DishesQuery = { __typename?: 'Query', dishes: Array<{ __typename?: 'DishRegisteredWithMeal', id: number, name: string, mealPosition: number, comment?: string | null }> };

export type DishesPerSourceQueryVariables = Exact<{ [key: string]: never; }>;


export type DishesPerSourceQuery = { __typename?: 'Query', dishesPerSource: Array<{ __typename?: 'DishesForDisplayWithSource', sourceId?: number | null, dishesPerMealPosition: Array<{ __typename?: 'DishesPerMealPosition', mealPosition?: number | null, dishes: Array<{ __typename?: 'Dish', id: number, name: string, mealPosition: number, comment?: string | null }> }> }> };

export type AddMealWithNewDishAndNewSourceMutationVariables = Exact<{
  dish: DishForCreate;
  meal: MealForCreate;
}>;


export type AddMealWithNewDishAndNewSourceMutation = { __typename?: 'Mutation', addMealWithNewDishAndNewSource?: { __typename?: 'AddMealWithNewDishAndNewSourcePayload', mealId: number } | null };

export type AddMealWithExistingDishMutationVariables = Exact<{
  dishId: Scalars['Int'];
  meal: MealForCreate;
}>;


export type AddMealWithExistingDishMutation = { __typename?: 'Mutation', addMealWithExistingDish?: { __typename?: 'AddMealWithExistingDishPayload', mealId: number } | null };

export type MealsForCalenderQueryVariables = Exact<{
  startDate: Scalars['ISO8601Date'];
}>;


export type MealsForCalenderQuery = { __typename?: 'Query', mealsForCalender: Array<{ __typename?: 'MealsOfDate', date: any, meals: Array<{ __typename?: 'MealForCalender', id: number, date: any, mealType: number, comment?: string | null, dish: { __typename?: 'Dish', id: number, name: string, mealPosition: number, comment?: string | null } }> }> };

export type RemoveMealMutationVariables = Exact<{
  mealId: Scalars['Int'];
}>;


export type RemoveMealMutation = { __typename?: 'Mutation', removeMeal?: { __typename?: 'RemoveMealPayload', mealId: number } | null };

export type UpdateMealWithNewDishAndNewSourceMutationVariables = Exact<{
  dish: DishForCreate;
  meal: MealForUpdate;
}>;


export type UpdateMealWithNewDishAndNewSourceMutation = { __typename?: 'Mutation', updateMealWithNewDishAndNewSource?: { __typename?: 'UpdateMealWithNewDishAndNewSourcePayload', mealId: number } | null };

export type UpdateMealWithExistingDishMutationVariables = Exact<{
  dishId: Scalars['Int'];
  meal: MealForUpdate;
}>;


export type UpdateMealWithExistingDishMutation = { __typename?: 'Mutation', updateMealWithExistingDish?: { __typename?: 'UpdateMealWithExistingDishPayload', mealId: number } | null };


export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  loginUserLogin(email: $email, password: $password) {
    credentials {
      uid
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignupDocument = gql`
    mutation signup($email: String!, $password: String!, $passwordConfirmation: String!) {
  loginUserRegister(
    email: $email
    password: $password
    passwordConfirmation: $passwordConfirmation
  ) {
    credentials {
      accessToken
    }
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      passwordConfirmation: // value for 'passwordConfirmation'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const AddDishDocument = gql`
    mutation addDish($dish: DishForCreate!) {
  addDish(input: {dish: $dish}) {
    dishId
  }
}
    `;
export type AddDishMutationFn = Apollo.MutationFunction<AddDishMutation, AddDishMutationVariables>;

/**
 * __useAddDishMutation__
 *
 * To run a mutation, you first call `useAddDishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDishMutation, { data, loading, error }] = useAddDishMutation({
 *   variables: {
 *      dish: // value for 'dish'
 *   },
 * });
 */
export function useAddDishMutation(baseOptions?: Apollo.MutationHookOptions<AddDishMutation, AddDishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDishMutation, AddDishMutationVariables>(AddDishDocument, options);
      }
export type AddDishMutationHookResult = ReturnType<typeof useAddDishMutation>;
export type AddDishMutationResult = Apollo.MutationResult<AddDishMutation>;
export type AddDishMutationOptions = Apollo.BaseMutationOptions<AddDishMutation, AddDishMutationVariables>;
export const DishesDocument = gql`
    query dishes($searchString: String) {
  dishes(searchString: $searchString) {
    id
    name
    mealPosition
    comment
  }
}
    `;

/**
 * __useDishesQuery__
 *
 * To run a query within a React component, call `useDishesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDishesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDishesQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *   },
 * });
 */
export function useDishesQuery(baseOptions?: Apollo.QueryHookOptions<DishesQuery, DishesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DishesQuery, DishesQueryVariables>(DishesDocument, options);
      }
export function useDishesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DishesQuery, DishesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DishesQuery, DishesQueryVariables>(DishesDocument, options);
        }
export type DishesQueryHookResult = ReturnType<typeof useDishesQuery>;
export type DishesLazyQueryHookResult = ReturnType<typeof useDishesLazyQuery>;
export type DishesQueryResult = Apollo.QueryResult<DishesQuery, DishesQueryVariables>;
export const DishesPerSourceDocument = gql`
    query dishesPerSource {
  dishesPerSource {
    sourceId
    dishesPerMealPosition {
      mealPosition
      dishes {
        id
        name
        mealPosition
        comment
      }
    }
  }
}
    `;

/**
 * __useDishesPerSourceQuery__
 *
 * To run a query within a React component, call `useDishesPerSourceQuery` and pass it any options that fit your needs.
 * When your component renders, `useDishesPerSourceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDishesPerSourceQuery({
 *   variables: {
 *   },
 * });
 */
export function useDishesPerSourceQuery(baseOptions?: Apollo.QueryHookOptions<DishesPerSourceQuery, DishesPerSourceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DishesPerSourceQuery, DishesPerSourceQueryVariables>(DishesPerSourceDocument, options);
      }
export function useDishesPerSourceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DishesPerSourceQuery, DishesPerSourceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DishesPerSourceQuery, DishesPerSourceQueryVariables>(DishesPerSourceDocument, options);
        }
export type DishesPerSourceQueryHookResult = ReturnType<typeof useDishesPerSourceQuery>;
export type DishesPerSourceLazyQueryHookResult = ReturnType<typeof useDishesPerSourceLazyQuery>;
export type DishesPerSourceQueryResult = Apollo.QueryResult<DishesPerSourceQuery, DishesPerSourceQueryVariables>;
export const AddMealWithNewDishAndNewSourceDocument = gql`
    mutation addMealWithNewDishAndNewSource($dish: DishForCreate!, $meal: MealForCreate!) {
  addMealWithNewDishAndNewSource(input: {dish: $dish, meal: $meal}) {
    mealId
  }
}
    `;
export type AddMealWithNewDishAndNewSourceMutationFn = Apollo.MutationFunction<AddMealWithNewDishAndNewSourceMutation, AddMealWithNewDishAndNewSourceMutationVariables>;

/**
 * __useAddMealWithNewDishAndNewSourceMutation__
 *
 * To run a mutation, you first call `useAddMealWithNewDishAndNewSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMealWithNewDishAndNewSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMealWithNewDishAndNewSourceMutation, { data, loading, error }] = useAddMealWithNewDishAndNewSourceMutation({
 *   variables: {
 *      dish: // value for 'dish'
 *      meal: // value for 'meal'
 *   },
 * });
 */
export function useAddMealWithNewDishAndNewSourceMutation(baseOptions?: Apollo.MutationHookOptions<AddMealWithNewDishAndNewSourceMutation, AddMealWithNewDishAndNewSourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMealWithNewDishAndNewSourceMutation, AddMealWithNewDishAndNewSourceMutationVariables>(AddMealWithNewDishAndNewSourceDocument, options);
      }
export type AddMealWithNewDishAndNewSourceMutationHookResult = ReturnType<typeof useAddMealWithNewDishAndNewSourceMutation>;
export type AddMealWithNewDishAndNewSourceMutationResult = Apollo.MutationResult<AddMealWithNewDishAndNewSourceMutation>;
export type AddMealWithNewDishAndNewSourceMutationOptions = Apollo.BaseMutationOptions<AddMealWithNewDishAndNewSourceMutation, AddMealWithNewDishAndNewSourceMutationVariables>;
export const AddMealWithExistingDishDocument = gql`
    mutation addMealWithExistingDish($dishId: Int!, $meal: MealForCreate!) {
  addMealWithExistingDish(input: {dishId: $dishId, meal: $meal}) {
    mealId
  }
}
    `;
export type AddMealWithExistingDishMutationFn = Apollo.MutationFunction<AddMealWithExistingDishMutation, AddMealWithExistingDishMutationVariables>;

/**
 * __useAddMealWithExistingDishMutation__
 *
 * To run a mutation, you first call `useAddMealWithExistingDishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMealWithExistingDishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMealWithExistingDishMutation, { data, loading, error }] = useAddMealWithExistingDishMutation({
 *   variables: {
 *      dishId: // value for 'dishId'
 *      meal: // value for 'meal'
 *   },
 * });
 */
export function useAddMealWithExistingDishMutation(baseOptions?: Apollo.MutationHookOptions<AddMealWithExistingDishMutation, AddMealWithExistingDishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMealWithExistingDishMutation, AddMealWithExistingDishMutationVariables>(AddMealWithExistingDishDocument, options);
      }
export type AddMealWithExistingDishMutationHookResult = ReturnType<typeof useAddMealWithExistingDishMutation>;
export type AddMealWithExistingDishMutationResult = Apollo.MutationResult<AddMealWithExistingDishMutation>;
export type AddMealWithExistingDishMutationOptions = Apollo.BaseMutationOptions<AddMealWithExistingDishMutation, AddMealWithExistingDishMutationVariables>;
export const MealsForCalenderDocument = gql`
    query mealsForCalender($startDate: ISO8601Date!) {
  mealsForCalender(startDate: $startDate) {
    date
    meals {
      id
      date
      mealType
      comment
      dish {
        id
        name
        mealPosition
        comment
      }
    }
  }
}
    `;

/**
 * __useMealsForCalenderQuery__
 *
 * To run a query within a React component, call `useMealsForCalenderQuery` and pass it any options that fit your needs.
 * When your component renders, `useMealsForCalenderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMealsForCalenderQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *   },
 * });
 */
export function useMealsForCalenderQuery(baseOptions: Apollo.QueryHookOptions<MealsForCalenderQuery, MealsForCalenderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MealsForCalenderQuery, MealsForCalenderQueryVariables>(MealsForCalenderDocument, options);
      }
export function useMealsForCalenderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MealsForCalenderQuery, MealsForCalenderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MealsForCalenderQuery, MealsForCalenderQueryVariables>(MealsForCalenderDocument, options);
        }
export type MealsForCalenderQueryHookResult = ReturnType<typeof useMealsForCalenderQuery>;
export type MealsForCalenderLazyQueryHookResult = ReturnType<typeof useMealsForCalenderLazyQuery>;
export type MealsForCalenderQueryResult = Apollo.QueryResult<MealsForCalenderQuery, MealsForCalenderQueryVariables>;
export const RemoveMealDocument = gql`
    mutation removeMeal($mealId: Int!) {
  removeMeal(input: {mealId: $mealId}) {
    mealId
  }
}
    `;
export type RemoveMealMutationFn = Apollo.MutationFunction<RemoveMealMutation, RemoveMealMutationVariables>;

/**
 * __useRemoveMealMutation__
 *
 * To run a mutation, you first call `useRemoveMealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMealMutation, { data, loading, error }] = useRemoveMealMutation({
 *   variables: {
 *      mealId: // value for 'mealId'
 *   },
 * });
 */
export function useRemoveMealMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMealMutation, RemoveMealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMealMutation, RemoveMealMutationVariables>(RemoveMealDocument, options);
      }
export type RemoveMealMutationHookResult = ReturnType<typeof useRemoveMealMutation>;
export type RemoveMealMutationResult = Apollo.MutationResult<RemoveMealMutation>;
export type RemoveMealMutationOptions = Apollo.BaseMutationOptions<RemoveMealMutation, RemoveMealMutationVariables>;
export const UpdateMealWithNewDishAndNewSourceDocument = gql`
    mutation updateMealWithNewDishAndNewSource($dish: DishForCreate!, $meal: MealForUpdate!) {
  updateMealWithNewDishAndNewSource(input: {dish: $dish, meal: $meal}) {
    mealId
  }
}
    `;
export type UpdateMealWithNewDishAndNewSourceMutationFn = Apollo.MutationFunction<UpdateMealWithNewDishAndNewSourceMutation, UpdateMealWithNewDishAndNewSourceMutationVariables>;

/**
 * __useUpdateMealWithNewDishAndNewSourceMutation__
 *
 * To run a mutation, you first call `useUpdateMealWithNewDishAndNewSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMealWithNewDishAndNewSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMealWithNewDishAndNewSourceMutation, { data, loading, error }] = useUpdateMealWithNewDishAndNewSourceMutation({
 *   variables: {
 *      dish: // value for 'dish'
 *      meal: // value for 'meal'
 *   },
 * });
 */
export function useUpdateMealWithNewDishAndNewSourceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMealWithNewDishAndNewSourceMutation, UpdateMealWithNewDishAndNewSourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMealWithNewDishAndNewSourceMutation, UpdateMealWithNewDishAndNewSourceMutationVariables>(UpdateMealWithNewDishAndNewSourceDocument, options);
      }
export type UpdateMealWithNewDishAndNewSourceMutationHookResult = ReturnType<typeof useUpdateMealWithNewDishAndNewSourceMutation>;
export type UpdateMealWithNewDishAndNewSourceMutationResult = Apollo.MutationResult<UpdateMealWithNewDishAndNewSourceMutation>;
export type UpdateMealWithNewDishAndNewSourceMutationOptions = Apollo.BaseMutationOptions<UpdateMealWithNewDishAndNewSourceMutation, UpdateMealWithNewDishAndNewSourceMutationVariables>;
export const UpdateMealWithExistingDishDocument = gql`
    mutation updateMealWithExistingDish($dishId: Int!, $meal: MealForUpdate!) {
  updateMealWithExistingDish(input: {dishId: $dishId, meal: $meal}) {
    mealId
  }
}
    `;
export type UpdateMealWithExistingDishMutationFn = Apollo.MutationFunction<UpdateMealWithExistingDishMutation, UpdateMealWithExistingDishMutationVariables>;

/**
 * __useUpdateMealWithExistingDishMutation__
 *
 * To run a mutation, you first call `useUpdateMealWithExistingDishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMealWithExistingDishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMealWithExistingDishMutation, { data, loading, error }] = useUpdateMealWithExistingDishMutation({
 *   variables: {
 *      dishId: // value for 'dishId'
 *      meal: // value for 'meal'
 *   },
 * });
 */
export function useUpdateMealWithExistingDishMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMealWithExistingDishMutation, UpdateMealWithExistingDishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMealWithExistingDishMutation, UpdateMealWithExistingDishMutationVariables>(UpdateMealWithExistingDishDocument, options);
      }
export type UpdateMealWithExistingDishMutationHookResult = ReturnType<typeof useUpdateMealWithExistingDishMutation>;
export type UpdateMealWithExistingDishMutationResult = Apollo.MutationResult<UpdateMealWithExistingDishMutation>;
export type UpdateMealWithExistingDishMutationOptions = Apollo.BaseMutationOptions<UpdateMealWithExistingDishMutation, UpdateMealWithExistingDishMutationVariables>;