import { memo, useRef, useEffect } from "react";
import { Folder, Folder2Open } from "react-bootstrap-icons";
import { classNames } from "@/utils/common";

const Directory = ({
  id,
  open,
  editing,
  onToggle,
  onFinishEditing,
  onUpdateName,
  name,
  children,
  className,
}) => {
  const textInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        textInputRef?.current &&
        !textInputRef?.current.contains(event.target)
      ) {
        onFinishEditing(id)();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [textInputRef]);

  useEffect(() => {
    // if Directory name is switched from normal state -> editting state, select all texts in input box
    if (typeof window !== "undefined" && editing) {
      window.document.getElementById(`textbox-${id}`)?.select();
    }
  }, [editing, id]);

  return (
    <div
      className={classNames(
        "group flex h-8 w-full cursor-pointer items-center  px-2 hover:bg-blue-300",
        className
      )}
      onClick={onToggle(id)}
    >
      {open ? <Folder2Open className="mr-2" /> : <Folder className="mr-2" />}
      {editing ? (
        <form onSubmit={onFinishEditing(id)}>
          <input
            ref={textInputRef}
            type="text"
            className="w-full rounded border border-gray-300 py-1 px-1 text-xs shadow-none"
            defaultValue={name}
            onChange={onUpdateName(id)}
            id={`textbox-${id}`}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          />
        </form>
      ) : (
        <span className="select-none text-xs">{name}</span>
      )}
      {children}
    </div>
  );
};

export default memo(Directory);
