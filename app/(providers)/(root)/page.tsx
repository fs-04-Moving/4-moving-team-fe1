import LandingPage from '@/components/templates/LandingPage';

async function HomePage() {
  // const queryClient = new QueryClient();

  // const cookieStore = await cookies(); // ✅ await 추가
  // const accessToken = cookieStore.get('accessToken')?.value;
  // console.log('accessToken', accessToken);
  // if (accessToken) {
  //   await queryClient.prefetchQuery({
  //     queryKey: ['me'],
  //     queryFn: () => getUserMeServer(accessToken),
  //   });
  // }
  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <LandingPage />
    // </HydrationBoundary>
  );
}

export default HomePage;

// import { getUserMeServer } from '@/api/users/getUserMeServer';
// import LandingPage from '@/components/templates/LandingPage';
// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from '@tanstack/react-query';

// async function HomePage() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ['me'],
//     queryFn: () =>
//       getUserMeServer(
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZWY4ZjRmMS04ZTMzLTQ2M2ItYjA4NC1hYzJiMjNkNjMwNTkiLCJlbWFpbCI6InBhZW5nZGFsMUBnbWFpbC5jb20iLCJpYXQiOjE3NDQwMDMxNjUsImV4cCI6MTc0NDAxMDM2NX0.uGpmV7RTAaHbNc9x5_6U1i5aZZEfYiGmmrXK3Lv8IZ0'
//       ),
//   });
//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <LandingPage />
//     </HydrationBoundary>
//   );
// }

// export default HomePage;
