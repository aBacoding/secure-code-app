export const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  uploadAvatar: (formData: FormData) => void,
): void => {
  const file = event.target.files?.[0];
  if (file) {
    const formData = new FormData();
    formData.append('avatar', file);
    uploadAvatar(formData);
  }
};

export const handleAvatarClick = (fileInputRef: React.RefObject<HTMLInputElement>): void => {
  fileInputRef.current?.click();
};
