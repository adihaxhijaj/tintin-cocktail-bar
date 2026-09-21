import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import type { Drink } from "@/lib/site";

type MenuGroup = {
  id: string;
  label: string;
  note: string;
  items: readonly Drink[];
};

// Shared list renderer for the Drinks and Eats menus. Items sit in two columns on desktop.
export function MenuSections({ groups }: { groups: readonly MenuGroup[] }) {
  return (
    <>
      {groups.map((group) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`${group.id}-heading`}
          className="scroll-mt-28 border-b border-bone/6 py-20 sm:py-28"
        >
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <Reveal className="mb-12 border-b border-bone/15 pb-6 sm:mb-16">
              <h2
                id={`${group.id}-heading`}
                className="font-display text-4xl text-bone sm:text-5xl"
              >
                {group.label}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-bone-dim">
                {group.note}
              </p>
            </Reveal>

            <Stagger className="grid gap-x-14 gap-y-9 sm:grid-cols-2 sm:gap-y-11">
              {group.items.map((item) => (
                <StaggerItem key={item.slug}>
                  <article>
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-display text-2xl leading-none text-bone">
                        {item.name}
                      </h3>
                      <span
                        aria-hidden
                        className="relative top-[-0.3rem] h-px flex-1 border-b border-dotted border-bone/25"
                      />
                      {item.base && (
                        <span className="whitespace-nowrap text-[0.7rem] uppercase tracking-[0.2em] text-brass/80">
                          {item.base}
                        </span>
                      )}
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-bone-dim">
                      {item.desc}
                    </p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ))}
    </>
  );
}
