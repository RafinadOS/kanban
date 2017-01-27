var container = React.createElement('div',
        { className: 'container' }, 
        React.createElement('img', { src: 'https://facebook.github.io/react/img/logo.svg' });
        React.createElement('h1', null, 'Hi, React!');
        React.createElement('p', null, 'какой-то подтекст');
    );

ReactDOM.render(jsx, document.getElementById('root'));