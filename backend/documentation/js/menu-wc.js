'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">splitwise-clone documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-180fd482ecb027eefef37696bc38c04d5f294a95d18e7f460d436ceac2834b73b9b4f385689b95a2a7d698d7065b2d702e8090f156c57ba9b162f176719fa0ec"' : 'data-bs-target="#xs-injectables-links-module-AppModule-180fd482ecb027eefef37696bc38c04d5f294a95d18e7f460d436ceac2834b73b9b4f385689b95a2a7d698d7065b2d702e8090f156c57ba9b162f176719fa0ec"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-180fd482ecb027eefef37696bc38c04d5f294a95d18e7f460d436ceac2834b73b9b4f385689b95a2a7d698d7065b2d702e8090f156c57ba9b162f176719fa0ec"' :
                                        'id="xs-injectables-links-module-AppModule-180fd482ecb027eefef37696bc38c04d5f294a95d18e7f460d436ceac2834b73b9b4f385689b95a2a7d698d7065b2d702e8090f156c57ba9b162f176719fa0ec"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-5d366b7b2737a6d0500887b8ca3fe9f5e191c16c5c3751a5f8ad1349a1f6a2ae9227bfcc8f351af2b575856860b37399edf8bee864d9c2077d2771d01d6e3ae9"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-5d366b7b2737a6d0500887b8ca3fe9f5e191c16c5c3751a5f8ad1349a1f6a2ae9227bfcc8f351af2b575856860b37399edf8bee864d9c2077d2771d01d6e3ae9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-5d366b7b2737a6d0500887b8ca3fe9f5e191c16c5c3751a5f8ad1349a1f6a2ae9227bfcc8f351af2b575856860b37399edf8bee864d9c2077d2771d01d6e3ae9"' :
                                            'id="xs-controllers-links-module-AuthModule-5d366b7b2737a6d0500887b8ca3fe9f5e191c16c5c3751a5f8ad1349a1f6a2ae9227bfcc8f351af2b575856860b37399edf8bee864d9c2077d2771d01d6e3ae9"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-5d366b7b2737a6d0500887b8ca3fe9f5e191c16c5c3751a5f8ad1349a1f6a2ae9227bfcc8f351af2b575856860b37399edf8bee864d9c2077d2771d01d6e3ae9"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-5d366b7b2737a6d0500887b8ca3fe9f5e191c16c5c3751a5f8ad1349a1f6a2ae9227bfcc8f351af2b575856860b37399edf8bee864d9c2077d2771d01d6e3ae9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-5d366b7b2737a6d0500887b8ca3fe9f5e191c16c5c3751a5f8ad1349a1f6a2ae9227bfcc8f351af2b575856860b37399edf8bee864d9c2077d2771d01d6e3ae9"' :
                                        'id="xs-injectables-links-module-AuthModule-5d366b7b2737a6d0500887b8ca3fe9f5e191c16c5c3751a5f8ad1349a1f6a2ae9227bfcc8f351af2b575856860b37399edf8bee864d9c2077d2771d01d6e3ae9"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExpenseCategoriesModule.html" data-type="entity-link" >ExpenseCategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ExpenseCategoriesModule-1dd5ada772578c840951c26c98ffaa747b9584d5d90d927625ce3db1d6b279f9cada7e5bd6b5e70e46177f27a6b0ad5c8ff286dc80674de732383f38cad2dae4"' : 'data-bs-target="#xs-controllers-links-module-ExpenseCategoriesModule-1dd5ada772578c840951c26c98ffaa747b9584d5d90d927625ce3db1d6b279f9cada7e5bd6b5e70e46177f27a6b0ad5c8ff286dc80674de732383f38cad2dae4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ExpenseCategoriesModule-1dd5ada772578c840951c26c98ffaa747b9584d5d90d927625ce3db1d6b279f9cada7e5bd6b5e70e46177f27a6b0ad5c8ff286dc80674de732383f38cad2dae4"' :
                                            'id="xs-controllers-links-module-ExpenseCategoriesModule-1dd5ada772578c840951c26c98ffaa747b9584d5d90d927625ce3db1d6b279f9cada7e5bd6b5e70e46177f27a6b0ad5c8ff286dc80674de732383f38cad2dae4"' }>
                                            <li class="link">
                                                <a href="controllers/ExpenseCategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExpenseCategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ExpenseCategoriesModule-1dd5ada772578c840951c26c98ffaa747b9584d5d90d927625ce3db1d6b279f9cada7e5bd6b5e70e46177f27a6b0ad5c8ff286dc80674de732383f38cad2dae4"' : 'data-bs-target="#xs-injectables-links-module-ExpenseCategoriesModule-1dd5ada772578c840951c26c98ffaa747b9584d5d90d927625ce3db1d6b279f9cada7e5bd6b5e70e46177f27a6b0ad5c8ff286dc80674de732383f38cad2dae4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ExpenseCategoriesModule-1dd5ada772578c840951c26c98ffaa747b9584d5d90d927625ce3db1d6b279f9cada7e5bd6b5e70e46177f27a6b0ad5c8ff286dc80674de732383f38cad2dae4"' :
                                        'id="xs-injectables-links-module-ExpenseCategoriesModule-1dd5ada772578c840951c26c98ffaa747b9584d5d90d927625ce3db1d6b279f9cada7e5bd6b5e70e46177f27a6b0ad5c8ff286dc80674de732383f38cad2dae4"' }>
                                        <li class="link">
                                            <a href="injectables/ExpenseCategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExpenseCategoriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExpensesModule.html" data-type="entity-link" >ExpensesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ExpensesModule-c334a745a1466894933281b1bac318dc88a1e4eca73d8711c17b65038ffeb8198a91ed9f11a5e945c3a8bb968e3c77eab18002fd55097bc24ce2a60f46c39fa4"' : 'data-bs-target="#xs-controllers-links-module-ExpensesModule-c334a745a1466894933281b1bac318dc88a1e4eca73d8711c17b65038ffeb8198a91ed9f11a5e945c3a8bb968e3c77eab18002fd55097bc24ce2a60f46c39fa4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ExpensesModule-c334a745a1466894933281b1bac318dc88a1e4eca73d8711c17b65038ffeb8198a91ed9f11a5e945c3a8bb968e3c77eab18002fd55097bc24ce2a60f46c39fa4"' :
                                            'id="xs-controllers-links-module-ExpensesModule-c334a745a1466894933281b1bac318dc88a1e4eca73d8711c17b65038ffeb8198a91ed9f11a5e945c3a8bb968e3c77eab18002fd55097bc24ce2a60f46c39fa4"' }>
                                            <li class="link">
                                                <a href="controllers/ExpensesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExpensesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ExpensesModule-c334a745a1466894933281b1bac318dc88a1e4eca73d8711c17b65038ffeb8198a91ed9f11a5e945c3a8bb968e3c77eab18002fd55097bc24ce2a60f46c39fa4"' : 'data-bs-target="#xs-injectables-links-module-ExpensesModule-c334a745a1466894933281b1bac318dc88a1e4eca73d8711c17b65038ffeb8198a91ed9f11a5e945c3a8bb968e3c77eab18002fd55097bc24ce2a60f46c39fa4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ExpensesModule-c334a745a1466894933281b1bac318dc88a1e4eca73d8711c17b65038ffeb8198a91ed9f11a5e945c3a8bb968e3c77eab18002fd55097bc24ce2a60f46c39fa4"' :
                                        'id="xs-injectables-links-module-ExpensesModule-c334a745a1466894933281b1bac318dc88a1e4eca73d8711c17b65038ffeb8198a91ed9f11a5e945c3a8bb968e3c77eab18002fd55097bc24ce2a60f46c39fa4"' }>
                                        <li class="link">
                                            <a href="injectables/ExpensesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExpensesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GroupsModule.html" data-type="entity-link" >GroupsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-GroupsModule-378d5f7bf798b7243d8fad358994587a943fb12f528aaa8b0d100421f922b01547450c3811948f81c54ad8b5de75190d4cda5db5b7a5861528d2e9cda2f21ba4"' : 'data-bs-target="#xs-controllers-links-module-GroupsModule-378d5f7bf798b7243d8fad358994587a943fb12f528aaa8b0d100421f922b01547450c3811948f81c54ad8b5de75190d4cda5db5b7a5861528d2e9cda2f21ba4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-GroupsModule-378d5f7bf798b7243d8fad358994587a943fb12f528aaa8b0d100421f922b01547450c3811948f81c54ad8b5de75190d4cda5db5b7a5861528d2e9cda2f21ba4"' :
                                            'id="xs-controllers-links-module-GroupsModule-378d5f7bf798b7243d8fad358994587a943fb12f528aaa8b0d100421f922b01547450c3811948f81c54ad8b5de75190d4cda5db5b7a5861528d2e9cda2f21ba4"' }>
                                            <li class="link">
                                                <a href="controllers/GroupsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-GroupsModule-378d5f7bf798b7243d8fad358994587a943fb12f528aaa8b0d100421f922b01547450c3811948f81c54ad8b5de75190d4cda5db5b7a5861528d2e9cda2f21ba4"' : 'data-bs-target="#xs-injectables-links-module-GroupsModule-378d5f7bf798b7243d8fad358994587a943fb12f528aaa8b0d100421f922b01547450c3811948f81c54ad8b5de75190d4cda5db5b7a5861528d2e9cda2f21ba4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GroupsModule-378d5f7bf798b7243d8fad358994587a943fb12f528aaa8b0d100421f922b01547450c3811948f81c54ad8b5de75190d4cda5db5b7a5861528d2e9cda2f21ba4"' :
                                        'id="xs-injectables-links-module-GroupsModule-378d5f7bf798b7243d8fad358994587a943fb12f528aaa8b0d100421f922b01547450c3811948f81c54ad8b5de75190d4cda5db5b7a5861528d2e9cda2f21ba4"' }>
                                        <li class="link">
                                            <a href="injectables/GroupsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-8a45c52f5bc506f9fcef1f4c7b34e596b06323bae0951c4fe354cc2b76489f6abcf1207439120a4bd3a6cf40174b139cda70f7a558a3f53d9bcdd3a9e74b81bf"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-8a45c52f5bc506f9fcef1f4c7b34e596b06323bae0951c4fe354cc2b76489f6abcf1207439120a4bd3a6cf40174b139cda70f7a558a3f53d9bcdd3a9e74b81bf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-8a45c52f5bc506f9fcef1f4c7b34e596b06323bae0951c4fe354cc2b76489f6abcf1207439120a4bd3a6cf40174b139cda70f7a558a3f53d9bcdd3a9e74b81bf"' :
                                        'id="xs-injectables-links-module-PrismaModule-8a45c52f5bc506f9fcef1f4c7b34e596b06323bae0951c4fe354cc2b76489f6abcf1207439120a4bd3a6cf40174b139cda70f7a558a3f53d9bcdd3a9e74b81bf"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-c5fb414662e64a0124dbcbd99c82772a121ba93b53d2986a8d75b562c1fd223649cd0ed8ac6bf3477f2bdb1cbf42ca9b8c4574803836a8e118fe892843b18989"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-c5fb414662e64a0124dbcbd99c82772a121ba93b53d2986a8d75b562c1fd223649cd0ed8ac6bf3477f2bdb1cbf42ca9b8c4574803836a8e118fe892843b18989"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-c5fb414662e64a0124dbcbd99c82772a121ba93b53d2986a8d75b562c1fd223649cd0ed8ac6bf3477f2bdb1cbf42ca9b8c4574803836a8e118fe892843b18989"' :
                                            'id="xs-controllers-links-module-UsersModule-c5fb414662e64a0124dbcbd99c82772a121ba93b53d2986a8d75b562c1fd223649cd0ed8ac6bf3477f2bdb1cbf42ca9b8c4574803836a8e118fe892843b18989"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-c5fb414662e64a0124dbcbd99c82772a121ba93b53d2986a8d75b562c1fd223649cd0ed8ac6bf3477f2bdb1cbf42ca9b8c4574803836a8e118fe892843b18989"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-c5fb414662e64a0124dbcbd99c82772a121ba93b53d2986a8d75b562c1fd223649cd0ed8ac6bf3477f2bdb1cbf42ca9b8c4574803836a8e118fe892843b18989"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-c5fb414662e64a0124dbcbd99c82772a121ba93b53d2986a8d75b562c1fd223649cd0ed8ac6bf3477f2bdb1cbf42ca9b8c4574803836a8e118fe892843b18989"' :
                                        'id="xs-injectables-links-module-UsersModule-c5fb414662e64a0124dbcbd99c82772a121ba93b53d2986a8d75b562c1fd223649cd0ed8ac6bf3477f2bdb1cbf42ca9b8c4574803836a8e118fe892843b18989"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ExpenseCategoriesController.html" data-type="entity-link" >ExpenseCategoriesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ExpensesController.html" data-type="entity-link" >ExpensesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/GroupsController.html" data-type="entity-link" >GroupsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddUsersDto.html" data-type="entity-link" >AddUsersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthResponseDto.html" data-type="entity-link" >AuthResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateExpenseCategoryDto.html" data-type="entity-link" >CreateExpenseCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateExpenseDto.html" data-type="entity-link" >CreateExpenseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateGroupDto.html" data-type="entity-link" >CreateGroupDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserResponseDto.html" data-type="entity-link" >GetUserResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Group.html" data-type="entity-link" >Group</a>
                            </li>
                            <li class="link">
                                <a href="classes/Share.html" data-type="entity-link" >Share</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShareInputDto.html" data-type="entity-link" >ShareInputDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInEmailDto.html" data-type="entity-link" >SignInEmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInUsernameDto.html" data-type="entity-link" >SignInUsernameDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUpDto.html" data-type="entity-link" >SignUpDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateExpenseCategoryDto.html" data-type="entity-link" >UpdateExpenseCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateExpenseDto.html" data-type="entity-link" >UpdateExpenseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateGroupDto.html" data-type="entity-link" >UpdateGroupDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExpenseCategoriesService.html" data-type="entity-link" >ExpenseCategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExpensesService.html" data-type="entity-link" >ExpensesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GroupsService.html" data-type="entity-link" >GroupsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/UserGuard.html" data-type="entity-link" >UserGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});