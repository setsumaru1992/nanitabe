export const buildMutationExecutor = <Input = any>(
  codegenMutationHook: () => any,
) => {
  const [mutation, { loading, error }] = codegenMutationHook();
  const execMutation = async (input: Input, { onComplated, onError }) => {
    return mutation({
      variables: input,
      onCompleted: (data) => {
        onComplated(data);
      },
      onError: (err) => {
        onError(err);
      },
    });
  };
  return [execMutation, loading, error];
};
