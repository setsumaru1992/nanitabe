import type { ApolloError } from '@apollo/client';

export type MutationCallbacks<Output> = {
  onCompleted?: (data: Output) => void;
  onError?: (error: ApolloError) => void;
};

export type ExecMutation<Input, Output> = (
  input: Input,
  callbacks: MutationCallbacks<Output>,
) => any;

type BuildMutationOption<Input> = {
  normalizeInput?: (input: Input) => Input;
};

export const buildMutationExecutor = <Input = any, Output = any>(
  codegenMutationHook: () => any,
  { normalizeInput }: BuildMutationOption<Input> = {},
) => {
  const [mutation, { mutationLoading, mutationError }] = codegenMutationHook();
  const execMutation = async (
    input: Input,
    { onCompleted, onError }: MutationCallbacks<Output>,
  ) => {
    const normalizedInput = normalizeInput ? normalizeInput(input) : input;
    return mutation({
      variables: normalizedInput,
      onCompleted: (data: Output) => {
        if (onCompleted) onCompleted(data);
      },
      onError: (error: ApolloError) => {
        console.error(error);
        if (onError) onError(error);
      },
    });
  };
  return [execMutation, mutationLoading, mutationError];
};
