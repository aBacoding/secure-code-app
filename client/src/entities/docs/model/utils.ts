export const getMethodColor = (method: string): string => {
  switch (method.toLowerCase()) {
    case 'get':
      return 'bg-blue-500';
    case 'post':
      return 'bg-green-500';
    case 'put':
      return 'bg-yellow-500';
    case 'delete':
      return 'bg-red-500';
    case 'patch':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};
