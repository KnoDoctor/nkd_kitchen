import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import CustomEditor from "../../utils/customCKEditorBuild/ckeditor";

function Editor({ data, setUpdatedData, setHasContentBeenEdited }) {
	let [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []); // run on mounting

	if (loaded) {
		return (
			<CKEditor
				config={{
					simpleUpload: {
						// The URL that the images are uploaded to.
						uploadUrl: "/api/upload",

						// // Enable the XMLHttpRequest.withCredentials property.
						// withCredentials: true,

						// // Headers sent along with the XMLHttpRequest to the upload server.
						// headers: {
						// 	"X-CSRF-TOKEN": "CSRF-Token",
						// 	Authorization: "Bearer <JSON Web Token>",
						// },
					},
				}}
				editor={CustomEditor}
				data={data}
				onReady={(editor) => {
					// You can store the "editor" and use when it is needed.
					console.log("Editor is ready to use!", editor);

					// // Insert the toolbar before the editable area.
					// editor.ui
					// 	.getEditableElement()
					// 	?.parentElement.insertBefore(
					// 		editor.ui.view.toolbar.element,
					// 		editor.ui.getEditableElement()
					// 	);
				}}
				onChange={(event, editor) => {
					// do something when editor's content changed
					const data = editor.getData();
					setUpdatedData(data);
					setHasContentBeenEdited(true);
					console.log({ event, editor, data });
				}}
				onBlur={(event, editor) => {
					console.log("Blur.", editor);
				}}
				onFocus={(event, editor) => {
					console.log("Focus.", editor);
				}}
				onError={(error, { willEditorRestart }) => {
					// If the editor is restarted, the toolbar element will be created once again.
					// The `onReady` callback will be called again and the new toolbar will be added.
					// This is why you need to remove the older toolbar.
					if (willEditorRestart) {
						this.editor.ui.view.toolbar.element.remove();
					}
				}}
			/>
		);
	} else {
		return <h2> Editor is loading </h2>;
	}
}

export default Editor;
