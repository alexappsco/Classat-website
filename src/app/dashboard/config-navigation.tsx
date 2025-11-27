// import { useMemo } from 'react';

// import { paths } from 'src/routes/paths';

// // import { hasClientPermission } from 'src/utils/hasClientPermission';

// import { useTranslations } from 'next-intl';

// import SvgColor from 'src/components/svg-color';

// const icon = (name: string) => (
//   <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
// );

// const ICONS = {
//   main: icon('ic_main'),
//   orders: icon('ic_orders'),
//   notifications: icon('ic_notifications'),
//   reports: icon('ic_reports'),
//   settings: icon('ic_settings'),
//   categories: icon('bi:grid-fill'),
//   products: icon('ic_products'),
//   inProgress: icon('tabler--progress'),
//   createOrder: icon('material-symbols--note-add-sharp'),
//   mailings: icon('tabler--mail'),
//   electronic_app: icon('streamline--qr-code'),
//   pending: icon('fa6-solid--hourglass-end'),
//   Payment: icon('solar--card-bold'),
//   Puzzle: icon('fluent--puzzle-piece-24-filled'),
//   branches: icon('ph--storefront-duotone'),
//   citiesAndAreas: icon('ic_location'),
//   clients: icon('mdi--users'),
//   megaphone: icon('mi--megaphone'),
//   packages: icon('ic_packages'),
//   menu: icon('healthicons--ui-menu-grid-outline'),
//   addons: icon('game-icons--ketchup'),
//   global: icon('global'),
//   drivers: icon('healthicons--truck-driver-outline'),
//   driversWallet: icon('ph:wallet-duotone'),
//   about: icon('about-svg'),
//   terms: icon('term-svg'),
//   privacy: icon('privacy-svg'),
//   app: icon('mobile'),
//   transactions: icon('ic_currencies'),
//   dashboard: icon('icons8-home'),
//   book: icon('book'),
//   note: icon('note-2'),
//   live: icon('battery-empty'),
//   package: icon('package'),
// };

// export function useNavData() {
//   const t = useTranslations();
//   const data = useMemo(
//     () => [
//       {
//         items: [
//           { title: t('Nav.main'), path: paths.dashboard.root, icon: ICONS.dashboard },
//           {
//             title: t('Nav.training_courses'),
//             path: paths.dashboard.trainingCourses.root,
//             icon: ICONS.book,
//           },
//           {
//             title: t('Nav.educational_curricula'),
//             path: paths.dashboard.educationalCurricula.root,
//             icon: ICONS.note,
//           },
//           {
//             title: t('Nav.live_broadcasts'),
//             path: paths.dashboard.liveBroadcasts.root,
//             icon: ICONS.live,
//           },
//           {
//             title: t('Nav.individual_sessions'),
//             path: paths.dashboard.socialServices.root,
//             icon: ICONS.clients,
//           },
//           {
//             title: t('Nav.study_packages'),
//             path: paths.dashboard.studyPackages.root,
//             icon: ICONS.package,
//           },
//         ],
//       },
//     ],
//     [t]
//   );

//   return data;
// }
