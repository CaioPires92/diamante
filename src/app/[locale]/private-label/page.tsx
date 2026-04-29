import { PrivateLabelHero } from '@/components/ui/privatelabel/PrivateLabelHero';
import { PrivateLabelBenefits } from '@/components/ui/privatelabel/PrivateLabelBenefits';
import { PrivateLabelProcess } from '@/components/ui/privatelabel/PrivateLabelProcess';
import { PrivateLabelCTA } from '@/components/ui/privatelabel/PrivateLabelCTA';

export default function PrivateLabelPage() {
  return (
    <main>
      <PrivateLabelHero />
      <PrivateLabelBenefits />
      <PrivateLabelProcess />
      <PrivateLabelCTA />
    </main>
  );
}
