import { useState } from "react";
import axios from "axios";
import { Box } from "@xstyled/styled-components";
import {
  Page,
  Dropzone,
  DropzoneInput,
  DropzoneContent,
  DropzoneBrowse,
  FormBox,
  ProgressBar,
  Datalist,
} from "../styles/form";

export default function Home() {
  const initialState = {
    filePreview: null,
    fileSize: {},
    fileType: "",
    progress: 0,
    compression: 0,
    error: null,
  };

  const [form, setForm] = useState(initialState);

  const handleCompression = () => {
    axios
      .post("/api/compress", {
        input: form.filePreview,
        type: form.fileType,
        compression: form.compression,
      })
      .then((res) => {
        const { data, compressedSize } = res.data;
        setForm({
          ...form,
          filePreview: data,
          fileSize: { ...form.fileSize, after: compressedSize },
        });
      })
      .catch((error) => console.error(error));
  };

  const handleFile = (event) => {
    setForm({ ...form, error: null });

    const file = event.target.files[0];

    if (file) {
      if (file.size > 5000000) {
        setForm({ ...form, error: "⚠️ File is too large, max 5MB." });
      }

      const type = file.type.toLowerCase().split("/")[1];

      if (type === "png" || type === "jpg" || type === "jpeg") {
        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadstart = () => setForm({ ...form, progress: 10 });

        reader.onloadend = () => {
          setTimeout(() => {
            setForm({
              ...form,
              progress: 100,
              filePreview: reader.result,
              fileSize: { ...form.fileSize, before: file.size },
              fileType: type,
            });
          }, 2000);
        };
      } else {
        setForm({ ...form, error: "⚠️ Unsupported format." });
      }
    } else {
      setForm({ ...form, error: "⚠️ No file found." });
    }
  };

  const removeFile = () => setForm(initialState);

  const fileInProgress = form.progress > 0 && !form.filePreview;

  return (
    <Page>
      <Box as="section">
        {fileInProgress && <ProgressBar />}

        <FormBox>
          {form.progress === 100 && form.filePreview ? (
            <Dropzone>
              {form.fileSize.after && (
                <Box
                  position="absolute"
                  left={12}
                  top={12}
                  p="12px"
                  color="dodgerblue"
                  border="1px solid lightgray"
                  borderRadius={10}
                  zIndex={3}
                >
                  Preview
                </Box>
              )}
              <img src={form.filePreview} alt="Uploaded file" />
              <Box
                as="span"
                role="button"
                onClick={removeFile}
                aria-label="Remove file"
                position="absolute"
                right={16}
                top={20}
                cursor="pointer"
              >
                <Dismiss />
              </Box>
            </Dropzone>
          ) : (
            <Dropzone fileInProgress={fileInProgress}>
              {!fileInProgress ? (
                <DropzoneContent>
                  <h1>Drag your file here</h1>

                  <span role="img" aria-label="File">
                    <FileIcon />
                  </span>

                  <span>or</span>

                  <DropzoneBrowse spaceX={16}>
                    <input type="file" />

                    {form.error && <p>{form.error}</p>}
                  </DropzoneBrowse>
                </DropzoneContent>
              ) : (
                <p>Uploading...</p>
              )}
              <DropzoneInput
                type="file"
                name="file_upload"
                accept=".jpg, .jpeg, .png"
                onChange={(event) => handleFile(event)}
              />
            </Dropzone>
          )}

          {form.filePreview && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mt={32}
            >
              <Box display="flex" flexDirection="column">
                {!form.fileSize.after && (
                  <>
                    <label htmlFor="compression">
                      Select compression rate:
                    </label>
                    <Box
                      as="input"
                      type="range"
                      list="compressionTicks"
                      id="compression"
                      name="compression"
                      onChange={(event) =>
                        setForm({ ...form, compression: +event.target.value })
                      }
                      defaultValue={0}
                      min={5}
                      max={9}
                      step={1}
                      w={250}
                    />
                    <Datalist id="compressionTicks">
                      <option value="5" label="0" />
                      <option value="6" label="25" />
                      <option value="7" label="50" />
                      <option value="8" label="75" />
                      <option value="9" label="100" />
                    </Datalist>
                  </>
                )}
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                spaceY={12}
              >
                <Box as="p" fontSize="0.875rem" color="dodgerblue">
                  Size: {(form.fileSize.before / Math.pow(1024, 1)).toFixed(2)}
                  KB
                </Box>
                {form.fileSize.after ? (
                  <Box
                    as="p"
                    fontSize="0.875rem"
                    fontWeight={700}
                    color="crimson"
                  >
                    Size after:{" "}
                    {(form.fileSize.after / Math.pow(1024, 1)).toFixed(2)}KB
                  </Box>
                ) : (
                  <Box
                    as="button"
                    onClick={handleCompression}
                    p="12px 32px"
                    border="none"
                    borderRadius={6}
                    cursor="pointer"
                  >
                    Crunch it!
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </FormBox>
      </Box>
    </Page>
  );
}

const FileIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="120"
      height="120"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#83848a"
      opacity="0.2"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
      <polyline points="13 2 13 9 20 9"></polyline>
    </svg>
  );
};

const Dismiss = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="dodgerblue"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  );
};
