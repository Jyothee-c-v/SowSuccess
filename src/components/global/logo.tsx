import type { SVGProps } from 'react';
import { Leaf } from 'lucide-react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2" aria-label="SowSuccess Logo">
      <Leaf className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold text-foreground">
        Sow<span className="text-primary">Success</span>
      </span>
    </div>
  );
}
