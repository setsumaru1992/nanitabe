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

/** Autogenerated input type of AddMealWithExistingDishAndExistingSource */
export type AddMealWithExistingDishAndExistingSourceInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  dishId: Scalars['Int'];
  meal: MealForCreate;
};

/** Autogenerated return type of AddMealWithExistingDishAndExistingSource. */
export type AddMealWithExistingDishAndExistingSourcePayload = {
  __typename?: 'AddMealWithExistingDishAndExistingSourcePayload';
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
  dishId?: InputMaybe<Scalars['Int']>;
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
  addMealWithExistingDishAndExistingSource?: Maybe<AddMealWithExistingDishAndExistingSourcePayload>;
  addMealWithNewDishAndNewSource?: Maybe<AddMealWithNewDishAndNewSourcePayload>;
  loginUserConfirmRegistrationWithToken?: Maybe<LoginUserConfirmRegistrationWithTokenPayload>;
  loginUserLogin?: Maybe<LoginUserLoginPayload>;
  loginUserLogout?: Maybe<LoginUserLogoutPayload>;
  loginUserRegister?: Maybe<LoginUserRegisterPayload>;
  loginUserResendConfirmationWithToken?: Maybe<LoginUserResendConfirmationWithTokenPayload>;
  loginUserSendPasswordResetWithToken?: Maybe<LoginUserSendPasswordResetWithTokenPayload>;
  loginUserUpdatePasswordWithToken?: Maybe<LoginUserUpdatePasswordWithTokenPayload>;
  updateMeal?: Maybe<UpdateMealPayload>;
};


export type MutationAddMealWithExistingDishAndExistingSourceArgs = {
  input: AddMealWithExistingDishAndExistingSourceInput;
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


export type MutationUpdateMealArgs = {
  input: UpdateMealInput;
};

export type Query = {
  __typename?: 'Query';
  dishes: Array<DishRegisteredWithMeal>;
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

/** Autogenerated input type of UpdateMeal */
export type UpdateMealInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  meal: MealForUpdate;
};

/** Autogenerated return type of UpdateMeal. */
export type UpdateMealPayload = {
  __typename?: 'UpdateMealPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
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

export type DishesQueryVariables = Exact<{
  searchString?: InputMaybe<Scalars['String']>;
}>;


export type DishesQuery = { __typename?: 'Query', dishes: Array<{ __typename?: 'DishRegisteredWithMeal', id: number, name: string, mealPosition: number, comment?: string | null }> };

export type AddMealWithNewDishAndNewSourceMutationVariables = Exact<{
  dish: DishForCreate;
  meal: MealForCreate;
}>;


export type AddMealWithNewDishAndNewSourceMutation = { __typename?: 'Mutation', addMealWithNewDishAndNewSource?: { __typename?: 'AddMealWithNewDishAndNewSourcePayload', mealId: number } | null };

export type AddMealWithExistingDishAndExistingSourceMutationVariables = Exact<{
  dishId: Scalars['Int'];
  meal: MealForCreate;
}>;


export type AddMealWithExistingDishAndExistingSourceMutation = { __typename?: 'Mutation', addMealWithExistingDishAndExistingSource?: { __typename?: 'AddMealWithExistingDishAndExistingSourcePayload', mealId: number } | null };

export type MealsForCalenderQueryVariables = Exact<{
  startDate: Scalars['ISO8601Date'];
}>;


export type MealsForCalenderQuery = { __typename?: 'Query', mealsForCalender: Array<{ __typename?: 'MealsOfDate', date: any, meals: Array<{ __typename?: 'MealForCalender', id: number, date: any, mealType: number, comment?: string | null, dish: { __typename?: 'Dish', id: number, name: string, mealPosition: number, comment?: string | null } }> }> };


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
export const AddMealWithExistingDishAndExistingSourceDocument = gql`
    mutation addMealWithExistingDishAndExistingSource($dishId: Int!, $meal: MealForCreate!) {
  addMealWithExistingDishAndExistingSource(input: {dishId: $dishId, meal: $meal}) {
    mealId
  }
}
    `;
export type AddMealWithExistingDishAndExistingSourceMutationFn = Apollo.MutationFunction<AddMealWithExistingDishAndExistingSourceMutation, AddMealWithExistingDishAndExistingSourceMutationVariables>;

/**
 * __useAddMealWithExistingDishAndExistingSourceMutation__
 *
 * To run a mutation, you first call `useAddMealWithExistingDishAndExistingSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMealWithExistingDishAndExistingSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMealWithExistingDishAndExistingSourceMutation, { data, loading, error }] = useAddMealWithExistingDishAndExistingSourceMutation({
 *   variables: {
 *      dishId: // value for 'dishId'
 *      meal: // value for 'meal'
 *   },
 * });
 */
export function useAddMealWithExistingDishAndExistingSourceMutation(baseOptions?: Apollo.MutationHookOptions<AddMealWithExistingDishAndExistingSourceMutation, AddMealWithExistingDishAndExistingSourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMealWithExistingDishAndExistingSourceMutation, AddMealWithExistingDishAndExistingSourceMutationVariables>(AddMealWithExistingDishAndExistingSourceDocument, options);
      }
export type AddMealWithExistingDishAndExistingSourceMutationHookResult = ReturnType<typeof useAddMealWithExistingDishAndExistingSourceMutation>;
export type AddMealWithExistingDishAndExistingSourceMutationResult = Apollo.MutationResult<AddMealWithExistingDishAndExistingSourceMutation>;
export type AddMealWithExistingDishAndExistingSourceMutationOptions = Apollo.BaseMutationOptions<AddMealWithExistingDishAndExistingSourceMutation, AddMealWithExistingDishAndExistingSourceMutationVariables>;
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