import { Step } from '../interfaces';

export function renderSan(san: San) {
  if (!san) return ''
  const lowerSan = san.toLowerCase(),
    isCapture = lowerSan.toLowerCase().includes('x'),
    fields = lowerSan.split(isCapture ? 'x' : '-');
  if (fields.length <= 1) return san;
  if (isCapture) return [fields[0], 'takes', ...fields.slice(1)].join(' ');
  else return fields.join(' ');
}

window.lidraughts.RoundSpeech = function() {

  const synth = window.speechSynthesis;

  const volumeStorage = window.lidraughts.storage.make('sound-volume');

  function say(text: string) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 1.2;
    msg.volume = parseFloat(volumeStorage.get());
    synth.cancel();
    synth.speak(msg);
  }

  return {
    jump(s: Step) {
      say(s.san ? renderSan(s.san) : 'Game starts');
    }
  };
}
