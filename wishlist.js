// Sample suggestion data
const suggestionsData = [
    'Jewellers',
    'Designers',
    'Artisans',
    'Craftsmen',
    'Goldsmiths',
    'Silversmiths'
  ];
  
  // Function to filter suggestions based on input text
  const filterSuggestions = (inputText) => {
    return suggestionsData.filter(suggestion =>
      suggestion.toLowerCase().includes(inputText.toLowerCase())
    );
  };
  
  // Function to display suggestions
  const displaySuggestions = () => {
    const inputText = searchInput.value;
    const filteredSuggestions = filterSuggestions(inputText);
    
    // Clear previous suggestions
    suggestions.innerHTML = '';
  
    // Display filtered suggestions
    filteredSuggestions.forEach(suggestion => {
      const suggestionElement = document.createElement('div');
      suggestionElement.classList.add('suggestion');
      suggestionElement.textContent = suggestion;
      suggestions.appendChild(suggestionElement);
    });
  
    // Show suggestions
    suggestions.style.display = filteredSuggestions.length ? 'flex' : 'none';
  };
  
  // Event listener for input focus
  searchInput.addEventListener('focus', () => {
    displaySuggestions();
  });
  
  // Event listener for input keyup
  searchInput.addEventListener('keyup', () => {
    displaySuggestions();
  });
  
  // Event listener for clicking on suggestions
  suggestions.addEventListener('click', (event) => {
    if (event.target.classList.contains('suggestion')) {
      searchInput.value = event.target.textContent;
      suggestions.style.display = 'none';
    }
  });
  
  // Event listener for clicking outside the input and suggestions
  document.addEventListener('click', (event) => {
    if (!event.target.matches('#searchInput') && !event.target.matches('.suggestion')) {
      suggestions.style.display = 'none';
    }
  });
  