import { paths } from 'src/routes/paths';

// API
export const HOST_API = process.env.NEXT_PUBLIC_HOST_API;
export const ASSETS_API = process.env.NEXT_PUBLIC_ASSETS_API;
export const HOST_API_SHARED = process.env.NEXT_PUBLIC_HOST_API_SHARED;


// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.controlPanel.main; // as '/dashboar


export const enum Icons {
  ImageBroken = 'ooui:image-broken',
  Eye = 'solar:eye-bold',
  Hide = 'mdi:hide',
  Edit = 'tabler:edit',
  Trash = 'heroicons:trash',
  Check = 'fa6-solid:check',
  CheckCircle = 'material-symbols:check-circle-outline-rounded',
  XMark = 'heroicons:trash',
  ArrowDown = 'eva:arrow-down-outline',
  Reviews = 'material-symbols:reviews-rounded',
  Reply = 'material-symbols:reply-rounded',
  Categories = 'material-symbols:category-rounded',
  Payment = 'streamline:payment-10',
  Add = 'tabler:plus',
  Banars = 'material-symbols:wallpaper',
  Posters = 'mingcute:announcement-line',
}

export const COOKIES_KEYS = {
  lang: 'NEXT_LOCALE',
  session: 'accessToken',
  user: 'user',
    expiryTime: 'expiryTime',
};

export const MAX_FILE_SIZE = 500 * 1024; // 50KB
export const MAX_FILE_SIZE_HELPER = true;
export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

