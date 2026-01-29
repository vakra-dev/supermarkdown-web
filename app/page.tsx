import { Hero } from '@/components/home/hero';
import { LiveDemo } from '@/components/home/live-demo';
import { Features } from '@/components/home/features';
import { UseCases } from '@/components/home/use-cases';
import { Platforms } from '@/components/home/platforms';
import { CodeExample } from '@/components/home/code-example';

export default function Home() {
  return (
    <>
      <Hero />
      <LiveDemo />
      <Features />
      <UseCases />
      <Platforms />
      <CodeExample />
    </>
  );
}
