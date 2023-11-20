const screen = {
    userProfile: document.querySelector(`.profile-data`),
    renderUser(user) {
        this.userProfile.innerHTML = `
                    <div class="info">
                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuario"/>
                        <div class="data">
                            <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                            <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                            <h4>Seguindo: 👥${user.following} 
                            Seguidores: 👥${user.followers}</h4>
                        <div/>
                    <div/>`

        let repositoriesItens = ``
        let eventsItens = ``

        user.repositories.forEach(repos => repositoriesItens += `
        <li class="info-repo"><a href="${repos.html_url}" target="_blank">${repos.name}</a> 
        <p class="info watchers">👀 ${repos.watchers}</p> 
        <p class="info forks">🍴 ${repos.forks}</p> 
        <p class="info language">🧑‍💻  ${repos.language}</p> 
        <p class="info star">⭐ ${repos.stargazers_count}</p></li>`)
        
        user.events.forEach(even => {
            if (even.type === `PushEvent`) {
                eventsItens += `<li><p class="repo-name">${even.repo.name} -</p> <p> ${even.payload.commits[0].message ?? 'Sem Informações'}</p></li>`
                
            } else if (even.type === `CreateEvent`){
                eventsItens += `<li><p class="repo-name">${even.repo.name} -</p> <p> ${even.payload.description ?? 'Sem Informações'}</p></li>`
            }
        })

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `
            <div class="repositories section">
                <h2>Repositórios</h2>
                <ul>${repositoriesItens}</ul>
            </div>
            <div class="events section">
                <h2>Eventos</h2>
                <ul>${eventsItens}</ul>
            </div>`
        }
    },

    renderNotFound() {
        this.userProfile.innerHTML = `<h3>Usuario não encontrado 😢</h3>`
    }
}

export {screen}