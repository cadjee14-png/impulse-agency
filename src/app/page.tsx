import { Hero } from '@/components/sections/hero';
import { Stats } from '@/components/sections/stats';
import { Services } from '@/components/sections/services';
import { Realisations } from '@/components/sections/realisations';
import { Process } from '@/components/sections/process';
import { Testimonials } from '@/components/sections/testimonials';
import { Integrations } from '@/components/sections/integrations';
import { AuditCta } from '@/components/sections/audit-cta';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Realisations />
      <Process />
      <Testimonials />
      <Integrations />
      <AuditCta />
    </>
  );
}
