// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {language, id, selectedLanguage, onChangeLanguages} = props
  const onClickedLanguage = () => {
    onChangeLanguages(id)
  }
  const buttonColor = selectedLanguage ? 'clicked-language-btn' : 'language-btn'
  return (
    <li>
      <button type="button" className={buttonColor} onClick={onClickedLanguage}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
