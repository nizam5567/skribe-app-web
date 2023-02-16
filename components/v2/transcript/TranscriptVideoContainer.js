import { Box, CircularProgress, Typography, Stack, Button } from '@mui/material';
import _ from 'lodash';

import fileDownload from 'js-file-download';
import { useDispatch } from 'react-redux';
import { useState, useEffect, Fragment, useRef } from 'react';
import ReactPlayer from 'react-player';
import XMLParser from 'react-xml-parser';
import { useRouter } from 'next/router';
import { display } from '@mui/system';
import axios from 'axios';
import { useAppSelector } from '../../../redux/store/hooks';
import { getEventService } from '../../../helpers/api-helper';
import { useAuthContext } from '../../../contexts/AuthContext';
import { boundClipActions } from '../../../redux/reducers/clipsReducer/clipsAction';
import { openModal } from '../../../redux/reducers/modalReducer/modalAction';
import { boundSnackbarActions } from '../../../redux/reducers/snackbarReducer/snackbarAction';
import ActionButton from '../ActionButton';
import ClipShareIcon from '../svg-components/ClipShare';
import ClipDownloadIcon from '../svg-components/ClipDownloadIcon';
import ClipDeleteIcon from '../svg-components/ClipDeleteIcon';
import SelectionPopup from './SelectionPopup';
import CustomPlayer from './CustomPlayer';
import ClipSelectionModal from './ClipSelectionModal';
import { downloadFileFromURL, getFormattedTimeForTranscript } from '../common';
import DeleteClipModal from './DeleteClip';
import UpdateClipModal from './UpdateClipModal';
import PreviewClip from './PreviewClip';
import PlayIcon from '../svg-components/PlayIcon';
import EditIcon from '../svg-components/EditIcon';

const TranscriptVideoContainer = ({ videoUrl }) => {
  const { accessToken } = useAuthContext();
  const dispatch = useDispatch();
  const alert = boundSnackbarActions;

  const router = useRouter();

  const { clips } = useAppSelector((store) => store.clipsReducer);

  //= ============start =====
  const [isTranscriptLoading, setIsTranscriptLoading] = useState(false);
  const [transcript, setTranscript] = useState();
  const [video, setVideo] = useState();
  const [isHighlighted, setHighlighted] = useState();
  const [participants, setParticipants] = useState();
  const transcriptRef = useRef(null);
  const videoRef = useRef(null);
  const [selectedText, setSelectedText] = useState();
  const [boxesChecked, setBoxesChecked] = useState();
  const [showCheckAll, setShowCheckAll] = useState();
  const [showHighlightTool, setShowHighlightTool] = useState();
  const [currentSelection, setCurrentSelection] = useState();
  const [eventId, setEventId] = useState();
  const [topPosition, setTopPosition] = useState(null);
  const [leftPosition, setLeftPosition] = useState(null);

  const [starttime, setStarttime] = useState(0);
  const [endtime, setEndtime] = useState(60 * 5 * 100 * 100);

  const [tmpStartTime, setTmpStartTime] = useState(0);
  const [tmpEndTime, setTmpEndTime] = useState(0);

  const [clipOptionModal, setClipOptionModal] = useState(false);
  const [openPreviewClip, setOpenPreviewClip] = useState(false);
  const [clipPlayModal, setClipPlayModal] = useState(false);
  const [makeClip, setMakeClip] = useState(false);
  const [playClip, setPlayClip] = useState(false);
  const [previewClipUrl, setPreviewClipUrl] = useState(null);
  const [previewClipTitle, setPreviewClipTitle] = useState('');
  const [previewClipSubtitle, setPreviewClipSubtitle] = useState('');
  const [formattedTranscript, setFormattedTranscript] = useState(null);
  // selected text startTime, endTime, text
  const [refXml, setRefXml] = useState(null);
  const [streamUrl, setStreamUrl] = useState();
  const [htmlFormattedTranscript, setHtmlFormattedTranscript] = useState();
  function getXmlData (xmlFileUrl) {
    // "https://video-clip-input.s3.us-west-2.amazonaws.com/transcript-demo/test.xml"
    fetch(xmlFileUrl)
      .then(async (res) => {
        const text = await res.text();
        const rfXml = new XMLParser().parseFromString(text);
        setRefXml(rfXml);
        // setIsTranscriptLoading(false);
      })
      .catch((error) => {
        console.log('error', error);
        // setIsTranscriptLoading(false);
      });
  }

  const formatTime = (time) => {
    const t = Math.floor(Number(time));
    let min = parseInt(t / 60);
    let sec = parseInt(t % 60);
    if (min < 10) {
      min = `0${min}`;
    }
    if (sec < 10) {
      sec = `0${sec}`;
    }
    return `${min}:${sec}`;
  };

  const buildFormattedParagraphs = () => {
    const html = _.map(formattedTranscript.segments, (para, idx) =>
      // document.getElementById("highlight-choice").hidden = false;
      // if (!para) {
      //   return;
      // }
      // const name = _.get(
      //   _.head(
      //     participants.filter((itm) => {
      //       return _.get(itm, "participantId") === _.get(para, "participantId");
      //     })
      //   ),
      //   "name"
      // );
      (
        <div key={idx} className="participant-content-section">
          <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
            {/* <span style={{ fontSize: "14px", lineHeight: "22px", fontWeight: 500, color: "#999999", marginRight: "33px" }}>{getFormattedTimeForTranscript(Math.floor(parseInt(para.starttime) / 1000))}
            </span> */}
            <span style={{ 'fontSize': '14px', 'lineHeight': '22px', 'fontWeight': 500, 'color': '#999999', 'marginRight': '33px' }}>{formatTime(para.starttime)}</span>
            {/* <span className="participant-name disable-select" style={{ 'fontSize': '14px', 'lineHeight': '22px', 'fontWeight': 600, 'color': '#1A2E35' }}> */}
            <span className="participant-name" style={{ 'fontSize': '14px', 'lineHeight': '22px', 'fontWeight': 600, 'color': '#1A2E35' }}
             >
              <b className="participant-name-text">{formatName(para.speaker)}</b>
            </span>
          </div>
          <p className="participant-text" style={{ 'lineHeight': '22px', 'fontsize': '15px', 'fontWeight': 400, 'color': '#3F434A', 'marginLeft': '73px' }}>
            <span data-pid={para.participantId} data-start={+para.starttime} data-end={+para.endtime} data-index={para.idx} onDoubleClick={paragraphClicked} className={`${_.lowerCase(para.speaker)} `}>
              {para.sentence}
            </span>
          </p>
        </div>
      ));
    setHtmlFormattedTranscript(html);
    setIsTranscriptLoading(false);
    return html;
  };
  useEffect(() => {
    if (formattedTranscript) {
      buildFormattedParagraphs();
    }
  }, [formattedTranscript]);

  const getPostEventVideo = async (eventId) => {
    try {
      if (Number(eventId) > 0 && accessToken) {
        const eventService = await getEventService(accessToken);
        const response = await eventService.getPosteventVideo(eventId);
        if (response.data.transcriptUrl) {
          // getXmlData(response.data.transcriptUrl);
          setStreamUrl(response.data.streamUrl);
          axios
            .get(response.data.transcriptUrl)
            .then((res) => {
              setFormattedTranscript(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (refXml === null) {
      getPostEventVideo(router.query.eventId);
    }
  }, [router.query.eventId]);

  useEffect(() => {
    if (refXml !== null) {
      initData();
    }
  }, [refXml]);

  useEffect(() => {
    // const mousePosition = (e) => {
    // var x = e.pageX;
    // var y = e.pageY;
    // setLeftPosition(x);
    // setTopPosition(y);
    // console.log(x, y);
    // };
    // window.addEventListener("mousemove", mousePosition);
    // return () => window.removeEventListener("mousemove", mousePosition);
  }, []);

  const wordCount = (innerText) => {
    innerText = (innerText || '').trim();
    if (innerText.length < 1) {
      return 0;
    }
    const arr = innerText.split(' ');
    return arr.length;
  };

  const initData = async () => {
    const xml = refXml;
    console.log(xml, '--new xml');
    const v = await fetch(
      videoUrl
      // "https://video-clip-input.s3.us-west-2.amazonaws.com/transcript-demo/GMT20220708-143118_Recording_avo_640x360.mp4"
    ).then((res) => _.get(res, 'url'));

    removeExistingHighlighting();
    const eventData = _.get(xml, 'children[0]');
    const eventId = _.get(eventData, 'attributes.id');

    setEventId(eventId);
    const transcriptList = _.get(xml, 'children[1].children').filter((item) => item.name === 'e');
    const totalWords = 0;

    let participantList = _.get(xml, 'children[0].children').filter((item) => item.name === 'ptps');

    participantList = participantList.map((itm) => ({
      'participantId': _.get(itm, 'children[0].attributes.id'),
      'name': _.get(_.head(_.get(itm, 'children[0].children').filter((i) => i.name === 'name')), 'value')
    }));
    setParticipants(participantList);
    // console.log(participantList);
    let entriesList = _.get(xml, 'children[1].children').filter((item) => item.name === 'e');

    const exhibitsList = _.get(xml, 'children[1].children').filter((item) => item.name === 'ex');

    entriesList = entriesList.map((item) => ({
      'participantId': _.get(item, 'attributes.pId'),
      'start': _.get(item, 'attributes.st'),
      'end': _.get(item, 'attributes.et'),
      'words': _.get(item, 'children[0].children').map((w) => ({
        'start': _.get(item, 'attributes.st'),
        'end': _.get(item, 'attributes.et'),
        'value': _.get(w, 'value')
      }))
    }));

    let index = 0;
    let lastParticipant;
    const deleteThese = [];
    let wws = [];
    for (const p of entriesList) {
      const participantId = _.get(p, 'participantId');
      const sameAsLastTime = lastParticipant === participantId;
      if (!sameAsLastTime) {
        wws = [];
      } else {
        deleteThese.push(p);
      }
      let previousWord = wws.length === 0 ? undefined : _.last(wws);
      for (const w of p.words) {
        if (previousWord) {
          wws.push({
            'start': +p.start,
            'end': +p.end,
            'value': ' ',
            'index': (++index).toString().padStart(12, '0')
          });
        }
        _.set(w, 'index', (++index).toString().padStart(12, '0'));
        wws.push(w);
        previousWord = w;
      }
      p.words = wws;
      lastParticipant = participantId;
    }
    entriesList = _.difference(entriesList, deleteThese);
    setTranscript(entriesList);

    setHighlighted(false);
    setVideo(v);
    setSelectedText([]);
    setCurrentSelection([]);
    const displayClipAll = {
      'display': 'none'
    };

    toggleHighlightTool(0, 0, false);
    setShowCheckAll(displayClipAll);
  };

  const removeExistingHighlighting = () => {
    Array.from(transcriptRef.current.querySelectorAll('div.transcript span.highlighted')).forEach((highlight) => highlight.classList.remove('highlighted'));
  };

  const paragraphClicked = (e) => {
    e.preventDefault();
    const { parentNode } = e.target;
    const container = document.querySelector('div.transcript');
    const transcriptSpans = _.sortBy(
      _.filter(Array.from(container.querySelectorAll('span')), (itm) => {
        if (itm.classList.contains('disable-select')) {
          return false;
        }
        return true;
      }),
      'dataset.index'
    );

    const selectionSpans = parentNode.querySelectorAll('span');
    const baseNode = _.head(selectionSpans);
    const extentNode = _.get(selectionSpans, `[${selectionSpans.length - 1}]`);
    highlightSelectionAndClearSelection(transcriptSpans, baseNode, extentNode);
    // console.log("selectionSpans", selectionSpans);
    const startTimeNode = selectionSpans[0];
    const endTimeNode = selectionSpans[selectionSpans.length - 1];
    // console.log(startTimeNode.getAttribute("data-start"));
    // console.log(endTimeNode.getAttribute("data-start"));
    setTmpStartTime(startTimeNode.getAttribute('data-start'));
    setTmpEndTime(endTimeNode.getAttribute('data-end'));
    const left = 880;
    const top = extentNode.offsetTop - 10; // TODO: polish this
    toggleHighlightTool(e.clientY, e.clientX, true);
  };

  const goToPointInVideo = (ts) => {
    // TODO: remove the adjustments, this was only for the sample
    //    console.log("start time " + ts);
    // const ast = ts - 510000;
    // console.log("adjusted start time " + ast);
    // const start = ast < 0 ? 0 : ast;
    // setStarttime(start / 1000)

    const start = ts;
    setStarttime(start);
  };

  const addClass = (w) => {
    if (_.isArrayLike(w)) {
      _.forEach(w, (elm) => {
        addClass(elm);
      });
      return;
    }
    w.classList.add('highlighted');
  };

  // const findParentSpan = (el) => {
  //     if (el) {
  //         while (el.nodeName !== 'SPAN') {
  //             el = el.parentNode;
  //             if(el == null) {
  //                 return undefined;
  //             }
  //         }
  //         if (el.classList.contains('space-character')) {
  //             return el.nextSibling || el.previousSibling;
  //         }
  //         return el;
  //     }
  //     return undefined;
  // };

  function highlightSelectionAndClearSelection (transcriptSpans, baseNode, extentNode) {
    if (!transcriptSpans || !baseNode || !extentNode) {
      return {};
    }

    //

    const sb = [];
    let highlighted = false;
    let done = false;
    const dataStart = +_.get(baseNode, 'dataset.start');
    const dataEnd = +_.get(extentNode, 'dataset.end');

    removeExistingHighlighting();
    // debugger;
    _.forEach(transcriptSpans, (itm) => {
      if (done) {
        return;
      }
      if (itm === baseNode) {
        highlighted = true;
      }

      if (highlighted) {
        itm.classList.add('highlighted');
        sb.push(itm.innerText);
      }

      if (itm === extentNode) {
        highlighted = false;
        done = true;
      }
    });
    // build speaker list

    const txtObj = {
      'start': dataStart,
      'end': dataEnd,
      'text': sb.join('')
    };
    if (txtObj.start) {
      goToPointInVideo(txtObj.start);
    }
    setCurrentSelection(txtObj);
    // return txtObj;
  }

  const ListenToDocumentSelection = (e) => {
    const container = document.querySelector('div.transcript');
    if (container.contains(e.target) && typeof window !== undefined) {
      // make sure that something is selected
      const sel = window.getSelection();      
      if (_.isNil(sel) || _.trim(sel.toString()).length < 1) {
        return;
      }

      // make sure that the selection is inside our transcript block
      let baseNode = _.get(sel, 'baseNode');
      let extentNode = _.get(sel, 'extentNode');
      
      // Fix for starting from speaker and if user selects only speaker name then select below transcript section
      let isUpdatedBaseNode = false;
      let isUpdatedExtentNode = false;
      
      if (baseNode.parentNode.classList.contains('participant-name-text')) {
        const parentElm = baseNode.parentNode.closest(".participant-content-section");
        let childNodeBase = parentElm.querySelector('.participant-text span');
        baseNode = childNodeBase;
        isUpdatedBaseNode = true;

        if (extentNode.parentNode.classList.contains('participant-name-text')) {
          let childNodeExtent = parentElm.querySelector('.participant-text span');
          extentNode = childNodeExtent;
          isUpdatedExtentNode = true;
        }
      }
      
      if (container.contains(baseNode) && isUpdatedBaseNode === false) {
        baseNode = baseNode.parentNode;
      }
      if (container.contains(extentNode) && isUpdatedExtentNode === false) {
        extentNode = extentNode.parentNode;
      }
      const arr = [baseNode, extentNode];
      const tmp = _.orderBy(arr, ['dataset.index']);

      baseNode = _.head(tmp);
      extentNode = _.last(tmp);

      setTmpStartTime(baseNode.getAttribute('data-start'));
      setTmpEndTime(extentNode.getAttribute('data-end'));
      if (!sel.isCollapsed) {
        const transcriptSpans = _.sortBy(
          _.filter(Array.from(container.querySelectorAll('span')), (itm) => {
            if (itm.classList.contains('disable-select')) {
              return false;
            }
            return true;
          }),
          'dataset.index'
        );

        if (!container.contains(baseNode)) {
          baseNode = _.head(transcriptSpans);
        }

        if (!container.contains(extentNode)) {
          extentNode = _.last(transcriptSpans);
        }
        //  goToPointInVideo(_.get(baseNode, 'dataset.start'));
        highlightSelectionAndClearSelection(transcriptSpans, baseNode, extentNode);

        if (sel.rangeCount) {
          const range = sel.getRangeAt(0).cloneRange();
          if (range.getBoundingClientRect) {
            const screenPosition = range.getBoundingClientRect();
            // console.log("screen position ", screenPosition);
            const left = 880; // screenPosition.x -20;// baseNode.offsetLeft -20;
            const top = extentNode.offsetTop - 10;
            // console.log("top: ", top, " left: ", left);
            toggleHighlightTool(e.clientY, e.clientX, true);
          }
        }
      }
      // clearWindowSelection();
    }
  };

  const toggleHighlightTool = (top, left, show) => {
    // debugger;
    console.log(`given coordinates (top, left): (${top}, ${left})`);
    setTopPosition(top - 80);
    setLeftPosition(left - 20);
    const svgStyle = {
      'top': top || 0,
      'left': left || 0,
      'display': show ? 'block' : 'none',
      'position': 'absolute'
    };

    setShowHighlightTool(svgStyle);
  };

  const commitToDocumentSelection = (e) => {
    const allText = _.cloneDeep(selectedText) || [];
    // debugger;
    /// //////////////////
    const selectedPhrases = [];
    const tmp = _.orderBy(document.querySelectorAll('div.transcript span.highlighted'), 'dataset.index');
    let prevPid = _.get(_.head(tmp), 'dataset.pid');
    let currentWords = [];
    let phrase = {
      'pid': prevPid,
      'participantName': _.get(_.find(participants, { 'participantId': prevPid }), 'name'),
      'words': currentWords
    };

    for (const span of tmp) {
      const pid = _.get(span, 'dataset.pid');
      if (pid !== prevPid) {
        prevPid = pid;
        selectedPhrases.push(phrase);
        currentWords = [];
        phrase = {
          pid,
          'participantName': _.get(_.find(participants, { 'participantId': prevPid }), 'name'),
          'words': currentWords
        };
      }
      currentWords.push(span.innerText);
    }
    if (phrase.words.length) {
      selectedPhrases.push(phrase);
    }
    /// ///////////////////////////
    allText.push(selectedPhrases);
    const displayClipAll = {
      'display': 'block'
    };
    console.log('commitToDocumentSelection', allText);
    setShowCheckAll(displayClipAll);
    setSelectedText(allText);
    setCurrentSelection([]);
    toggleHighlightTool(0, 0, false);
    clearWindowSelection();
  };

  const highlightSearchedText = (e) => {
    console.log('highlightSearchedText', e);
    removeExistingHighlighting();
    const text = _.get(e, 'target.value');
    // build list of matched words
    const typedWords = _.split(text, ' ');

    // highlight matched words
    const matchedWords = _.map(typedWords, (wd) => document.getElementsByClassName(_.lowerCase(wd)));
    addClass(matchedWords);
  };

  const clearWindowSelection = () => {
    if (typeof window !== undefined) {
      window.getSelection().empty();
    }
  };

  const toggleAllCheckboxes = () => {
    const checkboxesOnThePage = document.querySelectorAll('input[type="checkbox"]');
    console.log('checkboxes ', checkboxesOnThePage);
    const willBoxesBeChecked = !boxesChecked;
    _.forEach(checkboxesOnThePage, (cb) => {
      cb.checked = willBoxesBeChecked;
    });
    setBoxesChecked(willBoxesBeChecked);
  };

  const formatName = (name) => {
    const formattedName = name.replace('spk_', 'Speaker ');
    return formattedName;
  };

  const buildParagraphs = () => {
    const html = _.map(transcript, (para, idx) => {
      document.getElementById('highlight-choice').hidden = false;
      if (!para) {
        return;
      }
      const name = _.get(
        _.head(
          participants.filter((itm) => _.get(itm, 'participantId') === _.get(para, 'participantId'))
        ),
        'name'
      );
      return (
        <div key={idx}>
          <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
            <span style={{ 'fontSize': '14px', 'lineHeight': '22px', 'fontWeight': 500, 'color': '#999999', 'marginRight': '33px' }}>{getFormattedTimeForTranscript(Math.floor(parseInt(para.start) / 1000))}</span>
            <span className="participant-name disable-select" style={{ 'fontSize': '14px', 'lineHeight': '22px', 'fontWeight': 600, 'color': '#1A2E35' }}>
              <b>{formatName(name)}</b>
            </span>
          </div>
          <p className="participant-text" style={{ 'lineHeight': '22px', 'fontsize': '15px', 'fontWeight': 400, 'color': '#3F434A', 'marginLeft': '73px' }}>
            {para &&
              para.words &&
              para.words.map((word, i) => (
                <Fragment key={`${i}-participant-text`}>
                  <span data-pid={para.participantId} data-start={+word.start} data-end={+word.end} data-index={word.index} onDoubleClick={paragraphClicked} className={`${_.lowerCase(word.value)} `}>
                    {word.value}
                  </span>
                </Fragment>
              ))}
          </p>
        </div>
      );
    });

    return html;
  };

  const submitClips = (e) => {
    e.preventDefault();
    const clippingUrl = '';
  };

  const presentWords = (itm) => {
    if (itm && itm.length > 0) {
      const rtn = _.map(itm, (i, index) => {
        console.log('phraseItem ', i);
        return (
          <p key={_.uniqueId()}>
            <b>{i.participantName}: </b>
            {i.words.join('')}
          </p>
        );
      });
      //  debugger;
      return rtn;
    }
  };

  const createPhrases = () => {
    // debugger;
    if (_.get(selectedText, 'length') > 0) {
      const rtn = _.map(selectedText, (item, index) =>
        // (<h1>HELLO!!!</h1>);
        // console.log("item ", item);
        (
          <div className="flex-container" key={`${index}-selected-clip`} id={`${index}-selected-clip`}>
            <input type="checkbox" />
            <button className="flex-item-left" onClick={submitClips}>
              Clip
            </button>
            <div className="flex-item-right">{presentWords(item)}</div>
          </div>
        ));
      //  debugger;
      return rtn;
    }

    // (p) => {
    //     console.log("p ", p);
    //     rtn =  (<p className="flex-item-right" key={_.uniqueId()}>
    //         <b>{p.participantName}</b>
    //         {_.get(p, 'words').join('')}
    //     </p>);
  };

  //= ===end====

  const copyToClipboard = (clipUrl) => {
    navigator.clipboard.writeText(clipUrl);
    alert.success('Clips link copied!');
  };

  const downloadFile = async (url, fileName) => {
    const streamSaver = await require('streamsaver');
    await fetch(url)
      .then((res) => {
        const fileStream = streamSaver.createWriteStream(fileName);
        const writer = fileStream.getWriter();
        if (res.body.pipeTo) {
          writer.releaseLock();
          return res.body.pipeTo(fileStream);
        }

        const reader = res.body.getReader();
        const pump = () => reader.read().then((result) => (result.done ? writer.close() : writer.write(result.value).then(pump)));

        return pump();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadClip = (clipURL, filename) => {
    console.log(clipURL);
    // fileDownload(clipURL, `${filename.replaceAll(" ", "-")}.mp4`);
    // downloadFileFromURL(clipURL, `${filename.replaceAll(" ", "-")}.mp4`);
    downloadFile(clipURL, `${filename.replaceAll(' ', '-')}.mp4`);
  };

  const deleteClip = async (clipId) => {
    // try {
    //   const eventService = await getEventService(accessToken);
    //   const response = await eventService.eventsControllerDeleteVideoClip(clipId);
    //   boundClipActions.doDeleteClip(clipId);
    //   alert.success("Clips deleted!");
    // } catch (error) {
    //   alert.error("Something error occurred!");
    // }
  };

  useEffect(() => {
    if (tmpStartTime && tmpEndTime) {
      setClipOptionModal(true);
    }
  }, [tmpStartTime, tmpEndTime]);

  const handleVideoPosition = () => {
    // setClipOptionModal(false);
    console.log('handleVideoPosition');
    setStarttime(tmpStartTime);
    // setEndtime(tmpEndTime / 1000);
  };

  useEffect(() => {
    if (!clipOptionModal) {
      setMakeClip(false);
      setPlayClip(false);
      setTmpStartTime(false);
      setTmpEndTime(false);
    }
  }, [clipOptionModal]);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="flex-start" borderRadius={1} height={'calc(100vh - 25vh)'} sx={{ 'overflow': 'hidden' }}>
      <UpdateClipModal />
      <DeleteClipModal />
      {clipOptionModal && makeClip && <ClipSelectionModal toggleModal={() => setClipOptionModal(!clipOptionModal)} handleVideoPosition={handleVideoPosition} tmpStartTime={tmpStartTime} tmpEndTime={tmpEndTime} />}

      {openPreviewClip && <PreviewClip toggleModal={() => setOpenPreviewClip(!openPreviewClip)} clipUrl={previewClipUrl} title={previewClipTitle} subTitle={previewClipSubtitle} />}

      <SelectionPopup top={topPosition} left={leftPosition} setPlayClip={setPlayClip} setMakeClip={setMakeClip} handleVideoPosition={handleVideoPosition} tmpStartTime={tmpStartTime} tmpEndTime={tmpEndTime} />

      {isTranscriptLoading ? (
        <Box flex={1} sx={{ 'width': '50%', 'background': '#fff', 'overflow': 'hidden' }} mr={1} pl={3} borderRadius={1}>
          <Stack display="flex" direction="column" alignItems="center" justifyContent="center" sx={{ 'height': '100%' }}>
            <CircularProgress size="2rem" />
          </Stack>
        </Box>
      ) : (
        <Box flex={1} height={'100%'} sx={{ 'width': '50%', 'background': '#fff', 'overflow': 'auto' }} mr={1} pl={3} borderRadius={1}>
          <div className="transcript-tool" style={{ 'overflowY': 'auto' }}>
            <div className="absolute cursor-pointer" id="highlight-choice" onClick={commitToDocumentSelection} style={showHighlightTool}>
              <i className="fa-solid fa-highlighter"></i>
            </div>

            <div className="row" style={{ 'padding': '20px 20px 20px 0' }}>
              <div className="column">
                <div className="transcript" ref={transcriptRef}>
                  <div className="transcript-text">
                    <div className="transcript-content" onMouseUp={ListenToDocumentSelection}>
                      {/* {buildParagraphs()} */}
                      {/* {buildFormattedParagraphs()} */}
                      {htmlFormattedTranscript}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      )}
      <Box flex={1} sx={{ 'width': '50%', 'background': '#fff', 'overflow': 'hidden', 'height': '100%' }} ml={1} p={3} mb={1} borderRadius={1}>
        <CustomPlayer videoUrl={streamUrl} starttime={starttime} endtime={endtime} playClip={playClip} setPlayClip={setPlayClip} />
        {clips && clips.length ? (
          <Box sx={{ 'height': '50%', 'overflow': 'hidden' }}>
            <Box pt={2} height="15%">
              <Box display="flex" alignItems="center" mb={2}>
                <Typography sx={{ 'fontSize': '18px', 'fontWeight': 500, 'lineHeight': '22px', 'color': '#000' }}>Your Clips</Typography>
              </Box>
            </Box>
            <Box sx={{ 'background': '#fff', 'boxShadow': '0px 9px 24px rgba(0, 0, 0, 0.1)', 'height': '85%', 'overflow': 'auto', 'border': '1px solid #E8EBF2' }} borderRadius={2} p={1} pb={0}>
              <Box borderRadius={2} sx={{}}>
                {clips &&
                  clips.length > 0 &&
                  clips.map((clip, index) => (
                      <Box
                        key={index}
                        sx={{
                          'mb': 1,
                          'borderRadius': '5px',
                          'border': '1px solid #E8EBF2'
                        }}
                      >
                        <Box display="flex" alignItems="flex-start" justifyContent="flex-start" sx={{ 'borderBottom': '1px solid #EDEFF3', 'm': 2, 'mb': 0 }}>
                          <Box
                            display="flex"
                            sx={{ 'width': '80px', 'height': '48px', 'mb': 2, 'cursor': 'pointer' }}
                            onClick={() => {
                              setOpenPreviewClip(true);
                              setPreviewClipUrl(clip.clipURL);
                              setPreviewClipTitle(clip.title);
                              setPreviewClipSubtitle(clip.description);
                            }}
                          >
                            {clip?.status === 'COMPLETE'
                              ? (
                              <Box
                                sx={{
                                  'width': '80px',
                                  'height': '48px',
                                  'overflow': 'hidden',
                                  'borderRadius': '8px',
                                  'position': 'relative'
                                }}
                              >
                                <Box display="flex" justifyContent="center" alignItems="center" sx={{ 'position': 'absolute', 'top': 0, 'bottom': 0, 'left': 0, 'right': 0, 'background': 'rgba(0, 0, 0, 0.5)' }}>
                                  <PlayIcon />
                                </Box>
                                <ReactPlayer url={clip.clipURL} width="100%" height="100%" />
                              </Box>
                                )
                              : (
                              <Box
                                sx={{
                                  'width': '80px',
                                  'height': '48px',
                                  'border': '1px solid #E8EBF2',
                                  'display': 'flex',
                                  'justifyContent': 'center',
                                  'alignItems': 'center',
                                  'fontSize': '12px',
                                  'borderRadius': '5px'
                                }}
                              >
                                <CircularProgress size="2rem" />
                              </Box>
                                )}
                          </Box>
                          <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            sx={{
                              'ml': 2,
                              'overflow': 'hidden',
                              'width': '100%'
                            }}
                          >
                            <Box
                              sx={{
                                'display': 'flex',
                                'flexDirection': 'row',
                                'justifyContent': 'space-between',
                                'width': '100%'
                              }}
                            >
                              <Typography
                                sx={{
                                  'fontSize': '16px',
                                  'fontWeight': 600,
                                  'lineHeight': '20px',
                                  'color': '#01090F',
                                  'textOverflow': 'ellipsis',
                                  'overflow': 'hidden',
                                  'whiteSpace': 'nowrap',
                                  'width': '80%'
                                }}
                              >
                                {clip.title}
                              </Typography>

                              <Box
                                display="flex"
                                justifyContent="flex-end"
                                alignItems={'center'}
                                onClick={() => {
                                  boundClipActions.doStoreClip(clip);
                                  dispatch(openModal('updateClip'));
                                }}
                                sx={{
                                  'mx': 1,
                                  'ml': 2,
                                  'cursor': 'pointer',
                                  'width': '20%'
                                }}
                              >
                                <Typography
                                  sx={{
                                    'fontSize': '14px',
                                    'lineHeight': '18px',
                                    'fontWeight': 300,
                                    'mx': 1,
                                    'border': '1px solid #e6e6e6',
                                    'borderRadius': '5px',
                                    'padding': '2px 10px'
                                  }}
                                >
                                  Edit
                                </Typography>
                              </Box>
                            </Box>
                            <Typography
                              sx={{
                                'fontSize': '12px',
                                'fontWeight': 300,
                                'lineHeight': '20px',
                                'color': '#01090F',
                                'textOverflow': 'ellipsis',
                                'overflow': 'hidden',
                                'whiteSpace': 'nowrap',
                                'width': '100%'
                              }}
                            >
                              {clip.description}
                            </Typography>
                          </Box>
                        </Box>
                        {clip.status === 'COMPLETE' && clip.clipURL && (
                          <Box display="flex" justifyContent="flex-start" alignItems="center" sx={{ 'padding': '10px 0', 'fontSize': '14px' }}>
                            <Box display="flex" alignItems="center" onClick={() => copyToClipboard(clip.clipURL)} sx={{ 'borderRight': '1px solid #e6e6e6', 'mx': 1, 'ml': 2, 'cursor': 'pointer' }}>
                              <ClipShareIcon />
                              <Typography sx={{ 'fontSize': '14px', 'lineHeight': '18px', 'fontWeight': 300, 'mx': 1 }}>Share</Typography>
                            </Box>
                            {/* onClick={() => downloadClip(clip.clipURL, clip.title)}  */}
                            <Box component={'a'} display="flex" alignItems="center" sx={{ 'borderRight': '1px solid #e6e6e6', 'mx': 1, 'ml': 2, 'cursor': 'pointer' }} onClick={() => downloadClip(clip.clipURL, clip.title)}>
                              <ClipDownloadIcon />
                              <Typography sx={{ 'fontSize': '14px', 'lineHeight': '18px', 'fontWeight': 300, 'mx': 1 }}>Download</Typography>
                            </Box>
                            <Box
                              display="flex"
                              alignItems="center"
                              onClick={() => {
                                // var proceed = confirm("Are you sure you want to delete the video?");
                                // if (proceed) {
                                //   deleteClip(clip.clipId);
                                // }
                                boundClipActions.doStoreClip(clip);
                                dispatch(openModal('deleteClip'));
                              }}
                              sx={{ 'mx': 1, 'ml': 2, 'cursor': 'pointer' }}
                            >
                              <ClipDeleteIcon />
                              <Typography sx={{ 'fontSize': '14px', 'lineHeight': '18px', 'fontWeight': 300, 'mx': 1 }}>Delete</Typography>
                            </Box>
                          </Box>
                        )}
                      </Box>
                  ))}
                <Box pb={1}></Box>
              </Box>
            </Box>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default TranscriptVideoContainer;
