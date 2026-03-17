// DownloadFilesModal.tsx
import { useState } from "react";

type DownloadFilesModalProps = {
  show: boolean;
  onHide: () => void;
};

const DownloadFilesModal = ({ show, onHide }: DownloadFilesModalProps) => {
  const [formData, setFormData] = useState({
    missingFunctions: "",
    missingFunctionsText: "",
    additionalFeedback: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
          <div className="modal-content shadow-lg border-0">
            <div className="modal-header bg-opacity-10">
              <h5 className="modal-title fw-bold">
              Download files
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onHide}
              ></button>
            </div>

            <div className="modal-body p-4">
              <h3>Download files</h3>
            </div>

            <div className="modal-footer border-0 bg-light">
              <button
                type="button"
                className="btn btn-secondary px-4"
                onClick={onHide}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default DownloadFilesModal;
