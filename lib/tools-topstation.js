'use babel';

import ToolsTopstationView from './tools-topstation-view';
import { CompositeDisposable } from 'atom';

export default {

  toolsTopstationView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.toolsTopstationView = new ToolsTopstationView(state.toolsTopstationViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.toolsTopstationView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tools-topstation:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.toolsTopstationView.destroy();
  },

  serialize() {
    return {
      toolsTopstationViewState: this.toolsTopstationView.serialize()
    };
  },

  toggle() {
    console.log('ToolsTopstation was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
