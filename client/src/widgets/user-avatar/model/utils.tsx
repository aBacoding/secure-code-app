import { useNavigate } from 'react-router-dom';
import { USER_AVATAR_LINKS } from '@/widgets/user-avatar';

export const useUserAvatarLinks = (): {
  label: string;
  href?: string;
  icon: React.ReactNode;
  onClick: () => void;
}[] => {
  const navigate = useNavigate();

  return USER_AVATAR_LINKS.map((link) => ({
    ...link,
    onClick: (): void => {
      if (link.href) {
        navigate(link.href);
      } else if (link.onClick) {
        link.onClick();
      }
    },
  }));
};
