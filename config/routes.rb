Rails.application.routes.draw do

  root to: 'default#index'

  get 'dashboard', to: 'dashboard#index', as: 'dashboard'
  get '/auth/:provider/callback', to: 'omniauth_callbacks#twitter'

  resources :sessions, only: [:new]

  resources :user_amazon_books, only: [:create, :destroy]
  
  namespace :amazon do
    resources :items, only: [] do
      collection do
        get :search
      end
    end
  end

  namespace :api do
    resources :user_amazon_books, only: [:index]

    # ログイン中のユーザー用のAPI郡
    namespace :user do
      resources :user_amazon_books, only: [:index, :update]
    end
  end
end
