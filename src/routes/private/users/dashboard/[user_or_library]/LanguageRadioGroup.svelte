
<script lang="ts">
 const languages = [
            { id: 'english', name: '英語', nativeName: 'English' },
            { id: 'chinese', name: '中国語', nativeName: '中文' },
            { id: 'korean', name: '韓国語', nativeName: '한국어' },
            { id: 'german', name: 'ドイツ語', nativeName: 'Deutsch' },
            { id: 'french', name: 'フランス語', nativeName: 'Français' },
            { id: 'spanish', name: 'スペイン語', nativeName: 'Español' },
            { id: 'italian', name: 'イタリア語', nativeName: 'Italiano' },
            { id: 'portuguese', name: 'ポルトガル語', nativeName: 'Português' },
            { id: 'russian', name: 'ロシア語', nativeName: 'Русский' },
            { id: 'dutch', name: 'オランダ語', nativeName: 'Nederlands' },
            { id: 'polish', name: 'ポーランド語', nativeName: 'Polski' },
            { id: 'turkish', name: 'トルコ語', nativeName: 'Türkçe' },
            { id: 'hindi', name: 'ヒンディ語', nativeName: 'हिन्दी' },
            { id: 'arabic', name: 'アラビア語', nativeName: 'العربية' },
            { id: 'other', name: 'その他', nativeName:'その他'}
        ];
</script>

<div class="w-full p-6 bg-white rounded-lg">
    <h2 class="text-xl font-bold text-gray-800 mb-6 text-center">
        言語を選ぼう！
    </h2>
    
    <div class="flex flex-wrap gap-4 justify-center">
        {#each languages as language (language.id)}
        <label class="flex items-center space-x-1 p-1 rounded-lg border-1 cursor-pointer transition-all duration-200 min-w-8 border-indigo-500 bg-indigo-50 shadow-md">
            <input required type="radio" id={language.id} name="language" value={language.name} class="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2">
            <div class="flex flex-col">
                <span class="text-sm font-semibold text-gray-800">{language.nativeName}</span>
            </div>
        </label>
        {/each}
    </div>
</div>