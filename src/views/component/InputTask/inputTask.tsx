import React, {useState, useRef, useEffect} from 'react';
import styles from './index.module.scss';

interface InputTaskProps {
  id: string,
  title: string,
  onDone: (title: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> =({
  id,
  title,
  onDone,
  onEdited,
  onRemoved,
}) => {
  const [ checked, setChecked ] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode])

  return (
    <div
      className={styles.inputTask}
    >
      <label className={styles.inputTaskLabel}>
        <input
          type="checkbox"
          checked={checked}
          disabled={isEditMode}
          className={styles.inputTaskCheckbox}
          onChange={event => {
            setChecked(event.target.checked);
            if(event.target.checked) {
              setTimeout(() => {
                onDone(id);
              }, 500)
            }
          }}
        />
        { isEditMode ? (
          <input
            ref={editTitleInputRef}
            value={value}
            type="text"
            onChange={event => {
              setValue(event.target.value)
            }}
            onKeyDown={event => {
              if(event.key === 'Enter') {
                onEdited(id, value);
                setIsEditMode(false);
              }
            }}
            className={styles.inputTaskTitleEdit}
          />
        ) : (
          <div className={styles.inputTaskTitle}>{ title }</div>
        )}
      </label>
      { isEditMode ? (
        <button
          className={styles.inputTaskEdit}
          onClick={() => {
            onEdited(id, value);
            setIsEditMode(false);
          }}
        >
          Save
        </button>
      ) : (
        <button
          className={styles.inputTaskSave}
          onClick={() => {
            setIsEditMode(true);
          }}
        >
          Edit
        </button>
      )}
      <button
        className={styles.inputTaskRemove}
        onClick={() => {
          if(confirm('Are you sure?')) {
            onRemoved(id)
          }
        }}
      >
        Remove
      </button>
    </div>
  )
}
