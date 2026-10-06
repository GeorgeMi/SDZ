import { useTranslations } from "next-intl";
import { SCHEDULE } from "@/lib/site";

// Separate, right-aligned opening-time cell keeps the dashes aligned with proportional digits.
export default function ScheduleTable({ className = "" }: { className?: string }) {
  const t = useTranslations("contactSection");

  return (
    <table className={className}>
      <tbody>
        {SCHEDULE.map(({ labelKey, hours }) => (
          <tr key={labelKey}>
            <td className="pr-3 py-0.5">{t(labelKey)}</td>
            {hours ? (
              <>
                <td className="py-0.5 text-right">{hours.opens}</td>
                <td className="px-1.5 py-0.5">–</td>
                <td className="py-0.5">{hours.closes}</td>
              </>
            ) : (
              <td className="py-0.5" colSpan={3}>{t("scheduleClosed")}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
