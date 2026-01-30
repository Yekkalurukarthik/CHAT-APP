import { useQueryClient,useMutation } from '@tanstack/react-query';
import React from 'react'
import { login } from '../lib/api.js';
const useLogin = () => {
const queryClient = useQueryClient();
  console.log("In the useLogin Hook");
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  return {error,isPending,loginMutation:mutate};
}

export default useLogin
