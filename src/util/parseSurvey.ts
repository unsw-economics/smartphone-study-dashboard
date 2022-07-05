import Papa from "papaparse";

function parseSurvey(surveyResponses: any) {
  // Order rows lexicographically by StartDate
  surveyResponses.sort((a: any, b: any) => {
    if (a.StartDate < b.StartDate) {
      return -1;
    }
    if (a.StartDate > b.StartDate) {
      return 1;
    }
    return 0;
  });

  // Removed unused columns
  const unused_columns = [
    "Status",
    "IPAddress",
    "Progress",
    "Duration (in seconds)",
    "Finished",
    "RecordedDate",
    "RecipientLastName",
    "RecipientFirstName",
    "RecipientEmail",
    "ExternalReference",
    "LocationLatitude",
    "LocationLongitude",
    "DistributionChannel",
    "UserLanguage",
    "mlp_state",
  ];
  unused_columns.forEach((column) => {
    surveyResponses.forEach((response: any) => {
      delete response[column];
      // Remove all columns that start with '_'
      Object.keys(response).forEach((key) => {
        if (key.startsWith("_")) {
          delete response[key];
        }
      });
    });
  });

  // Add mlp_min column
  surveyResponses.forEach((response: any) => {
    response["mlp_min"] = "";
  });

  // Rename columns
  var renamed_variables: { [key: string]: string } = {
    "timeuse1#1_1_1": "timeuse1_sleeping",
    "timeuse1#1_2_1": "timeuse1_exercising",
    "timeuse1#1_3_1": "timeuse1_lectures",
    "timeuse1#1_4_1": "timeuse1_studying",
    "timeuse2#1_1_1": "timeuse2_socinperson",
    "timeuse2#1_2_1": "timeuse2_socdigital",
    "timeuse3#1_1_1": "timeuse3_tv",
    "timeuse3#1_2_1": "timesuse3_smartphone",
    "timeuse3#1_3_1": "timeuse3_computer",
    "timeuse3#1_4_1": "timeuse3_tablet",
    "timeuse3#1_5_1": "timeuse3_gaming",
    sleep_1: "fallasleep",
    sleep_2: "wakeup",
    insomnia_1: "insomnia1",
    insomnia_2: "insomnia2",
    insomnia_3: "insomnia3",
    patience_1: "patience",
    sas_1: "sas1",
    sas_2: "sas2",
    sas_3: "sas3",
    sas_4: "sas4",
    sas_5: "sas5",
    sas_6: "sas6",
    sas_7: "sas7",
    sas_8: "sas8",
    sas_9: "sas9",
    sas_10: "sas10",
    kessler_1: "kessler1",
    kessler_2: "kessler2",
    kessler_3: "kessler3",
    kessler_4: "kessler4",
    kessler_5: "kessler5",
    kessler_6: "kessler6",
    kessler_7: "kessler7",
    kessler_8: "kessler8",
    kessler_9: "kessler9",
    kessler_10: "kessler10",
    disagnosis_10_TEXT: "diagnosis_text",
    mpl_1: "mpl0",
    mpl_2: "mpl50",
    mpl_3: "mpl100",
    mpl_4: "mpl150",
    mpl_5: "mpl200",
    mpl_6: "mpl250",
    mpl_7: "mpl300",
    mpl_8: "mpl350",
    mpl_9: "mpl400",
    mpl_10: "mpl450",
    mpl_11: "mpl500",
    yesterday: "Yesterday",
    ResponseId: "ResponseID",
    participantID_gen: "participantID",
  };
  Object.keys(renamed_variables).forEach((key) => {
    surveyResponses.forEach((response: any) => {
      response[renamed_variables[key]] = response[key];
      delete response[key];
    });
  });

  // Clean the data
  function cleanTime(time: string) {
    return time
      .replace(";", ":")
      .replace("am", "")
      .trim()
      .replace("12:00pm", "00:00")
      .replace("24:", "00:")
      .replace(/^([0-9]{2}:[0-9]{2}):00$/, "$1")
      .replace(/^([0-2]?[0-9])$/, "$1:00");
  }

  const clean_funcs: { [key: string]: (s: string) => string } = {
    zId: (s) => s.replace(/.*([0-9]{7}).*/, "$1"),
    fallasleep: cleanTime,
    wakeup: cleanTime,
    full_name: (s) => s.trim(),
  };
  Object.keys(clean_funcs).forEach((key) => {
    surveyResponses.forEach((response: any) => {
      response[key] = clean_funcs[key](response[key]);
    });
  });

  // If mpl_redo is not empty then replace the current mpl with the redo mpl
  const redo: { [key: string]: string } = {
    mpl_redo_1: "mpl0",
    mpl_redo_2: "mpl50",
    mpl_redo_3: "mpl100",
    mpl_redo_4: "mpl150",
    mpl_redo_5: "mpl200",
    mpl_redo_6: "mpl250",
    mpl_redo_7: "mpl300",
    mpl_redo_8: "mpl350",
    mpl_redo_9: "mpl400",
    mpl_redo_10: "mpl450",
    mpl_redo_11: "mpl500",
  };
  Object.keys(redo).forEach((key) => {
    surveyResponses.forEach((response: any) => {
      if (response[key] !== "") {
        response[redo[key]] = response[key];
        delete response[key];
      }
    });
  });

  // Calculate mpl_min
  const mpl_series: { [key: string]: number } = {
    mpl0: 0,
    mpl50: 0.5,
    mpl100: 1,
    mpl150: 1.5,
    mpl200: 2,
    mpl250: 2.5,
    mpl300: 3,
    mpl350: 3.5,
    mpl400: 4,
    mpl450: 4.5,
    mpl500: 5,
  };
  Object.keys(mpl_series).forEach((key) => {
    surveyResponses.forEach((response: any) => {
      // Skip if survery responses are not done
      if (response["mpl0"] === "") return;

      for (var s in mpl_series) {
        if (response[s] === "2") {
          response["mpl_min"] = mpl_series[s];
          break;
        }
      }
    });
  });

  // Reorder columns in responses
  const order: string[] = [
    "StartDate",
    "EndDate",
    "ResponseID",
    "enrolled",
    "android",
    "age18",
    "declaration",
    "consent",
    "full_name",
    "zId",
    "email",
    "email_confirm",
    "gender",
    "occupation",
    "study_status",
    "study_year",
    "usage_est",
    "Yesterday",
    "timeuse1_sleeping",
    "timeuse1_exercising",
    "timeuse1_lectures",
    "timeuse1_studying",
    "timeuse2_socinperson",
    "timeuse2_socdigital",
    "timeuse3_tv",
    "timesuse3_smartphone",
    "timeuse3_computer",
    "timeuse3_tablet",
    "timeuse3_gaming",
    "fallasleep",
    "wakeup",
    "insomnia1",
    "insomnia2",
    "insomnia3",
    "sleepdiss1",
    "sleepdiss2",
    "sleepdiss3",
    "sleepdiss4",
    "patience",
    "sas1",
    "sas2",
    "sas3",
    "sas4",
    "sas5",
    "sas6",
    "sas7",
    "sas8",
    "sas9",
    "sas10",
    "covid",
    "kessler1",
    "kessler2",
    "kessler3",
    "kessler4",
    "kessler5",
    "kessler6",
    "kessler7",
    "kessler8",
    "kessler9",
    "kessler10",
    "mental_illness",
    "disagnosis",
    "diagnosis_text",
    "mpl0",
    "mpl50",
    "mpl100",
    "mpl150",
    "mpl200",
    "mpl250",
    "mpl300",
    "mpl350",
    "mpl400",
    "mpl450",
    "mpl500",
    "mpl_min",
    "mpl_change",
    "participantID",
  ];

  const csvString = Papa.unparse(surveyResponses, {
    header: true,
    columns: order,
  });

  return csvString + "\r\n";
}

export { parseSurvey };
