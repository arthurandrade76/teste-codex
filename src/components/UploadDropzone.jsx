import Icon from './Icon.jsx';

export default function UploadDropzone({ accept, description, files = [], multiple = false, name, onChange, title }) {
  return (
    <label className="upload-dropzone">
      <input accept={accept} multiple={multiple} name={name} onChange={onChange} type="file" />
      <span className="upload-dropzone__content">
        <Icon name="upload" size={24} />
        <span className="upload-dropzone__copy">
          <strong>{title}</strong>
          <small>{files.length > 0 ? `${files.length} arquivo(s) selecionado(s)` : description}</small>
        </span>
      </span>
    </label>
  );
}
