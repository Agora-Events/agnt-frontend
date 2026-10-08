import React from 'react';

export const DitherDivider: React.FC = () => {
  return (
    <div className="w-full overflow-hidden text-center select-none py-6 opacity-30">
      <pre className="font-mono text-[11px] sm:text-xs tracking-wider text-neutral-800 whitespace-pre overflow-x-auto">
        {" .:-=+*#%@░▒▓█▓▒░%#*+=-:. .:-=+*#%@░▒▓█▓▒░%#*+=-:. .:-=+*#%@░▒▓█▓▒░%#*+=-:. "}
      </pre>
    </div>
  );
};
