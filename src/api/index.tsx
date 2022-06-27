// const apiUrl = "https://zhang-smartphone-web.onrender.com/api";

import {
  Subject,
  StudyDate,
  UsageSummary,
  BackupUsageInfo,
} from "../ts/interfaces/api_interfaces";
import { StrDict } from "../ts/types/app_types";

// const apiUrl = "http://localhost:3000/api";
const apiUrl = "https://zhang-smartphone-web-production.onrender.com/api";

/**
 * A helper function which wraps around the fetch API to make a GET request.
 * @param resource The resource to fetch from the backend.
 * @param params The query parameters to send with the request.
 * @returns A json object containing the response from the backend.
 */
async function get(resource: string, params?: StrDict): Promise<Object> {
  const token = localStorage.getItem("token");
  const headers = {
    authorization: `${token}`,
  };

  // Format the query parameters string
  var queryParams = "";
  if (params) {
    queryParams += "?";
    queryParams += Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");
  }

  // Make the request
  const response = await fetch(`${apiUrl}/${resource}${queryParams}`, {
    headers,
    method: "GET",
  });

  const json = await response.json();
  return json.data;
}

/**
 * Retrieves a list of subjects from the backend.
 * @returns A list of all subjects in the database.
 */
export async function getSubjects(group?: string): Promise<Subject[]> {
  var subjects;
  if (group) {
    subjects = (await get("get-all-subjects", { group })) as Subject[];
  } else {
    subjects = (await get("get-all-subjects")) as Subject[];
  }

  const datetimeRegex = /(\d+)-(\d+)-(\d+)T(\d+):(\d+).*/;

  // Alter properties of subjects to be more readable
  subjects.forEach((subject: Subject) => {
    subject.identified = subject.identified ? "True" : "False";
    subject.date_inserted = subject.date_inserted.replace(
      datetimeRegex,
      "$4:$5 $1/$2/$3"
    );
    if (subject.last_activity) {
      subject.last_activity = subject.last_activity.replace(
        datetimeRegex,
        "$4:$5 $1/$2/$3"
      );
    }
  });

  return subjects;
}

/**
 * Retrieves a list of study dates from the backend.
 * @returns A list of all study dates in the database.
 */
export async function getDates(): Promise<StudyDate[]> {
  return (await get(`get-all-dates`)) as StudyDate[];
}

/**
 * Retrieves simple usage data from the backend.
 * @returns A list of simple usage data in the database
 */
export async function getBackupUsage(): Promise<BackupUsageInfo[]> {
  const usage = (await get(`get-all-usage`)) as BackupUsageInfo[];
  usage.forEach(
    (u: BackupUsageInfo) => (u.date_reported = u.date_reported.slice(0, 10))
  );
  return usage;
}

/**
 * Retrieves a list of detailed usage data from the backend.
 * @returns A list of detailed usage data in the database.
 */
export async function getMainUsage() {
  return (await get(`get-all-reports`)) as Object[];
}

/**
 * Retrieves a summary/report of the usage data.
 * @returns A report as a list of objects.
 */
export async function getUsageSummary(group?: string): Promise<UsageSummary[]> {
  var summary;
  if (group) {
    summary = (await get("get-usage-summary", { group })) as UsageSummary[];
  } else {
    summary = (await get("get-usage-summary")) as UsageSummary[];
  }

  summary.forEach((s: UsageSummary) => {
    s.latest_sign_in = s.latest_sign_in.replace(
      /(\d+)-(\d+)-(\d+)T(\d+):(\d+).*/,
      "$4:$5 $1/$2/$3"
    );
  });
  return summary;
}
