/*
Original code copied from https://mantine.dev/others/dropzone/
TODO: There is a bug with react 18. Update when the mantine fix is released.
Source: https://github.com/mantinedev/mantine/issues/1647
*/
import { Group, Text, useMantineTheme, MantineTheme } from "@mantine/core";
import { Upload, Photo, X, Icon as TablerIcon } from "tabler-icons-react";
import { Dropzone, DropzoneStatus, MIME_TYPES } from "@mantine/dropzone";
import { FileRejection } from "react-dropzone";
import Papa from "papaparse";
import { parseSurvey } from "../../util/parseSurvey";
import { downloadCSV } from "../../util";

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

export const dropzoneChildren = (
  status: DropzoneStatus,
  theme: MantineTheme
) => (
  <Group
    position="center"
    spacing="xl"
    style={{ minHeight: 220, pointerEvents: "none" }}
    className="w-full"
  >
    <ImageUploadIcon
      status={status}
      style={{ color: getIconColor(status, theme) }}
      size={80}
    />

    <div>
      <Text size="xl" inline>
        Drag Qualtrics survey responese here or click to select files
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        The CSV file should not exceed 5mb.
      </Text>
    </div>
  </Group>
);

function handleOnDrop(files: File[]) {
  files.forEach((file) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      var contents = e.target?.result as string;

      // var data = parseCSV(contents.replace(/\r/g, ""));
      var result = Papa.parse<any>(contents.replace(/\r/g, ""), {
        header: true,
        skipEmptyLines: true,
      });

      const survey = parseSurvey(result.data.slice(2));
      downloadCSV("data:text/csv;charset=utf-8," + survey, "output.csv");
    };

    reader.readAsText(file);
  });
}

function handleOnReject(fileRejections: FileRejection[]) {
  alert(`The file type ${fileRejections[0].file.type} is not supported.`);
}

function SurveyVarCoding() {
  const theme = useMantineTheme();
  return (
    <div className="w-full">
      <p>
        The required Qualtrics file can be found by going to Data &amp; Analysis
        &gt; Export &amp; Import &gt; CSV &gt; Select 'Download all fields' and
        'Use numeric values' &gt; Download
      </p>
      <Dropzone
        onDrop={handleOnDrop}
        onReject={handleOnReject}
        maxSize={3 * 1024 ** 2}
        accept={[MIME_TYPES.csv]}
        className="w-full"
      >
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
    </div>
  );
}

export default SurveyVarCoding;
