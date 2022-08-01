import React from 'react';
import FileUploader from 'devextreme-react/file-uploader';
import 'devextreme/dist/css/dx.light.css';
import { bundleAndSignData, createData } from "arbundles";
//import { generateTransactionChunksAsync, uploadTransactionAsync } from "arweave-stream-tx";
// import testGenerateTransactionChunksAsync from '../../utils/asyncFunctions';

import { createTransactionAsync } from '../../utils/uploadTransactions/create-transaction-async';
//import { generateTransactionChunksAsync } from '../../utils/uploadTransactions/generate-transaction-chunks-async';
import { uploadTransactionAsync } from '../../utils/uploadTransactions/upload-transaction-async';

class TestUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chunks: [] };
    this.onUploadProgress = this.onUploadProgress.bind(this);
    this.onUploadStarted = this.onUploadStarted.bind(this);
    this.onFileChange = props.onFileChange.bind(this);
  }

  //updateChunks//={updateChunks} file={file} rawFile={rawFile} onFileChange={onFileChange}
  createTransaction(preGeneratedChunks) {
    //const chunkedData = await generateTransactionChunksAsync(preGeneratedChunks).then(data => data);
    //console.log(chunkedData);
    //console.log(data)
    //const uploadStatus = uploadTransaction(await data)
    //console.log("client return",await data, uploadStatus)
    let data = createTransactionAsync(preGeneratedChunks).then(data => data)
    return data
  }

  async uploadData(preChunkedData) {
    //const uploadStatus = uploadTransaction(await data)
    let data2 = await createTransactionAsync(preChunkedData)
    let data = await uploadTransactionAsync(data2)
    console.log("client return", data)
    return data
  }

  render() {
    return (
      <div className="dx-viewport">
        <button onClick={() => this.createTransaction(this.state.chunks)}>createTrans</button>
        <button onClick={() => this.uploadData(this.state.chunks)}>uploadTrans</button>

        <br />
        <br />
        {/* <div className={"inputContainerStyle"}>
          <input
            type="file"
            onChange={this.onFileChange}
          />
        </div> */}

        <FileUploader
          name="file"
          accept="video/*"
          uploadUrl="https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/ChunkUpload"
          chunkSize={200000}
          onUploadStarted={this.onUploadStarted}
          onProgress={this.onUploadProgress} />
        <span className="note">Allowed file extensions: <span>.jpg, .jpeg, .gif, .png</span>.</span>
        <span className="note">Maximum file size: <span>4 MB.</span></span>
        <div className="chunk-panel">
          {
            this.state.chunks.map((c, i) => <div key={i}>
              <span>Chunk size:</span>
              <span className="segment-size dx-theme-accent-as-text-color">{this.getValueInKb(c.segmentSize)}</span>
              <span>, Uploaded:</span>
              <span className="loaded-size dx-theme-accent-as-text-color">{this.getValueInKb(c.bytesLoaded)}</span>
              <span>/</span>
              <span className="total-size dx-theme-accent-as-text-color">{this.getValueInKb(c.bytesTotal)}</span>
            </div>)
          }
          {this.state.chunks.length > 0 && <div className="total-size">Total size: {this.getValueInKb(this.state.chunks.reduce((acc, c) => acc + c.bytesLoaded, 0))}</div>}
        </div>
      </div>
    );
  }

  onUploadProgress(e) {
    console.log(e)

    const chunk = {
      file: e.file,
      segmentSize: e.segmentSize,
      bytesLoaded: e.bytesLoaded,
      minByteRange: (e.bytesLoaded - e.segmentSize),
      maxByteRange: e.bytesLoaded,
      bytesTotal: e.bytesLoaded,
      byteLength: e.segmentSize,
    };
    this.setState({ chunks: [...this.state.chunks, chunk] });
  }

  onUploadStarted() {
    this.setState({ chunks: [] });
  }

  getValueInKb(value) {
    return `${(value / 1024).toFixed(0)}kb`;
  }
}

export default TestUploader;
