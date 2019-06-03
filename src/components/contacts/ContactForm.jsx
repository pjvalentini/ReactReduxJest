import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput.jsx";
import SelectInput from "../common/SelectInput.jsx";

const ContactForm = ({
  contact,
  creators,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{contact.id ? "Edit" : "Add"} Contact</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Name"
        value={contact.name}
        onChange={onChange}
        error={errors.name}
      />

      <TextInput
        name="category"
        label="Email"
        value={contact.category}
        onChange={onChange}
        error={errors.category}
      />

      <SelectInput
        name="creatorId"
        label="Created By"
        value={contact.creatorId || ""}
        defaultOption="Select Creator"
        options={creators.map(creator => ({
          value: creator.id,
          text: creator.name
        }))}
        onChange={onChange}
        error={errors.creator}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  creators: PropTypes.array.isRequired,
  contact: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default ContactForm;
