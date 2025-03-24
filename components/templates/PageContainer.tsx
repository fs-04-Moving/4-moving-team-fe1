import { ReactNode } from 'react';

function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center">
      <main className="flex w-full mx-6 mt-6">{children}</main>
    </div>
  );
}

export default PageContainer;
