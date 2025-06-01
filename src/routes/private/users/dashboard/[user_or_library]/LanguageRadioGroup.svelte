
<script lang="ts">
 const languages = [
            { id: 'english', name: 'English', nativeName: 'English' },
            { id: 'chinese', name: 'Chinese', nativeName: '中文' },
            { id: 'spanish', name: 'Spanish', nativeName: 'Español' },
            { id: 'hindi', name: 'Hindi', nativeName: 'हिन्दी' },
            { id: 'arabic', name: 'Arabic', nativeName: 'العربية' },
            { id: 'portuguese', name: 'Portuguese', nativeName: 'Português' },
            { id: 'bengali', name: 'Bengali', nativeName: 'বাংলা' },
            { id: 'russian', name: 'Russian', nativeName: 'Русский' },
            { id: 'urdu', name: 'Urdu', nativeName: 'اردو' },
            { id: 'german', name: 'German', nativeName: 'Deutsch' },
            { id: 'french', name: 'French', nativeName: 'Français' },
            { id: 'turkish', name: 'Turkish', nativeName: 'Türkçe' },
            { id: 'korean', name: 'Korean', nativeName: '한국어' },
            { id: 'italian', name: 'Italian', nativeName: 'Italiano' },
            { id: 'dutch', name: 'Dutch', nativeName: 'Nederlands' },
            { id: 'polish', name: 'Polish', nativeName: 'Polski' },
            { id: 'vietnamese', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
            { id: 'thai', name: 'Thai', nativeName: 'ภาษาไทย' },
            { id: 'other', name: 'Other', nativeName:'その他'}
        ];
</script>

<div class="w-full p-6 bg-white rounded-lg">
    <h2 class="text-xl font-bold text-gray-800 mb-6 text-center">
        言語を選ぼう！
    </h2>
    
    <div class="flex flex-wrap gap-4 justify-center">
        {#each languages as language (language.id)}
        <label class="flex items-center space-x-1 p-1 rounded-lg border-1 cursor-pointer transition-all duration-200 min-w-8 border-indigo-500 bg-indigo-50 shadow-md">
            <input type="radio" id={language.id} name="language" value={language.id} class="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2">
            <div class="flex flex-col">
                <span class="text-sm font-semibold text-gray-800">{language.nativeName}</span>
            </div>
        </label>
        {/each}
    </div>
</div>