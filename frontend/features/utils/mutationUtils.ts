export const buildMutationExecutor = <Input = any>(
  codegenMutationHook: () => any,
) => {
  const [mutation, { loading, error }] = codegenMutationHook();
  const execMutation = async (input: Input, { onComplated, onError }) => {
    return mutation({
      variables: input,
      onCompleted: (data) => {
        if (onComplated) onComplated(data);
      },
      onError: (err) => {
        console.error(err);
        if (onError) onError(err);
      },
    });
  };
  return [execMutation, loading, error];
};
