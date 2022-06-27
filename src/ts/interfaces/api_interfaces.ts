interface Subject {
  id: number;
  subject_id: string;
  email: string;
  identified: boolean | string;
  test_group: number;
  treatment_intensity: number;
  treatment_limit: number;
  study_group: string;
  date_inserted: string;
  last_activity?: string;
}

interface StudyDate {
  period_name: string;
  baseline_date: string;
  treatment_date: string;
  endline_date: string;
  over_date: string;
  is_default: Boolean;
}

interface UsageSummary {
  subject_id: string;
  test_group: number;
  avg_treatment_usage: number;
  treatment_report_days: number;
  days_under_limit: number;
  avg_baseline_usage: number;
  baseline_report_days: number;
  latest_sign_in: string;
  study_group: string;
}

interface BackupUsageInfo {
  subject_id: string;
  study_group: string;
  date_reported: string;
  usage: number;
  period: string;
  day: number;
}

export type { Subject, StudyDate, UsageSummary, BackupUsageInfo };
