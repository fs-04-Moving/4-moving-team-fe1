import ImageLogo from '@/components/atoms/ImageLogo';
import PageContainer from '@/components/templates/PageContainer';

async function HomePage() {
  return (
    <PageContainer>
      <ImageLogo width={114} />
    </PageContainer>
  );
}

export default HomePage;
