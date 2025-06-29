
const RecordingWave: React.FC = () => {
  return (
    <div className="flex items-end gap-[2px] h-10 overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className={`w-[4px] rounded-full bg-primary-dark animate-wave`}
          style={{ animationDelay: `${i * 0.1}s` }}
        ></div>
      ))}
    </div>
  );
};

