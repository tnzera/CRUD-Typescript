import React, { useState } from "react";
import { createPitch } from "../../services/apiService";
import "./../css/PitchForm.css";

interface PitchFormProps {
  onSuccess: () => void;
}

export function PitchForm({ onSuccess }: PitchFormProps) {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setError("Missing Name.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      await createPitch(name, file);
      onSuccess();
    } catch (err) {
      setError("Failed to load Pitch.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pitch-form">
      <h2>Add New Pitch</h2>
      <div className="form-group">
        <label htmlFor="name">Pitch Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="pitchImage">Pitch Image</label>
        <input
          type="file"
          id="pitchImage"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      <button
        type="submit"
        className="form-submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Add Pitch"}
      </button>
    </form>
  );
}
