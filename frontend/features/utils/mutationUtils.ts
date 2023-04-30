export const buildMutationExecutor = <Input = any>(
  codegenMutationHook: () => any,
) => {
  const [mutation, { loading, error }] = codegenMutationHook();
  const execMutation = async (input: Input, { onCompleted, onError }) => {
    return mutation({
      variables: input,
      onCompleted: (data) => {
        if (onCompleted) onCompleted(data);
      },
      onError: (err) => {
        console.error(err);
        if (onError) onError(err);
      },
    });
  };
  return [execMutation, loading, error];
};
