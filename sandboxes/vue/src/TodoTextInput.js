function handleSubmit(e) {
  if (e.which === 13) {
    this.on.save(e.target.value);
  }
}

function handleInput(e) {
  this.on.inputChange(e.target.value);
}

function handleBlur(e) {
  this.on.blur(e.target.value);
}

export default {
  functional: true,

  props: {
    onSave: Function,
    onInputBlur: Function,
    onInputChange: Function,
    text: String,
    placeholder: String,
    classes: String,
  },

  render(h, context) {
    const {
      data,
      props: { text, placeholder, classes },
    } = context;

    return (
      <input
        class={classes}
        type="text"
        placeholder={placeholder}
        autoFocus="true"
        value={text}
        onBlur={handleBlur.bind(data)}
        onInput={handleInput.bind(data)}
        onKeyup={handleSubmit.bind(data)}
      />
    );
  },
};
