'use client';

interface ConsoleOutputProps {
  output: string[];
  isVisible: boolean;
}

export default function ConsoleOutput({ output, isVisible }: ConsoleOutputProps) {
  if (!isVisible) return null;

  return (
    <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-auto max-h-48">
      <div className="mb-2 text-gray-400 text-xs font-semibold">Console Output:</div>
      {output.length === 0 ? (
        <div className="text-gray-500 italic">No console output</div>
      ) : (
        <div className="space-y-1">
          {output.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 