import React, { Fragment } from 'react'


export default function Chart() {
    return (
        <Fragment>
            <html class="no-js" lang="">
                <head>
                    <meta charset="utf-8"></meta>
                    <meta http-equiv="x-ua-compatible" content="ie=edge"></meta>
                    <title>Cryptocurreny Chart</title>
                    <meta name="description" content=""></meta>
                    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                    <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.ico"></link>

                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"></link>
                    <link rel="stylesheet" href="assets/css/bootstrap.min.css"></link>
                    <link rel="stylesheet" href="assets/css/style.css"></link>
                    <link rel="stylesheet" href="assets/css/responsive.css"></link>
                </head>
                <body>
                    <div class="main-container">
                        <div class="chart-container">
                            <div id="chart" class="chart"></div>
                            <div class="chart-data-control-container">
                                <div class="dropdown">
                                    <a class="btn dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="dropdown-item-container">
                                            <object data="assets/images/flag-usa.svg" type="image/svg+xml"></object>
                                            USD
                                        </span>
                                    </a>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item active" href="#">
                                            <span class="dropdown-item-container" data-id="usd">
                                                <object data="assets/images/flag-usa.svg" type="image/svg+xml"></object>
                                                USD
                                            </span>
                                        </a>
                                        <a class="dropdown-item" href="#">
                                            <span class="dropdown-item-container" data-id="euro">
                                                <object data="assets/images/flag-europe.svg" type="image/svg+xml"></object>
                                                EURO
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="chart-control-container">
                                <div class="chart-control-block">
                                    <a href="#" id="move-chart-to-current-quote" class="chart-control" title="Move Chart To Current Quote">
                                        <i class="far fa-dot-circle"></i>
                                    </a>
                                </div>
                                <div class="chart-control-block">
                                    <a href="#" id="zoom-chart-in" class="chart-control" title="Increase Chart Scale">
                                        <i class="fas fa-plus-circle"></i>
                                    </a>
                                    <a href="#" id="zoom-chart-out" class="chart-control" title="Decrease Chart Scale" disabled>
                                        <i class="fas fa-minus-circle"></i>
                                    </a>
                                </div>
                                <div class="chart-control-block">
                                    <a href="#" id="toggle-multi-chart-series-line-area" class="chart-control active" title="Area Chart">
                                        <i class="fas fa-chart-area"></i>
                                    </a>
                                    <div class="btn-group dropright">
                                        <a
                                            class="dropdown-toggle chart-control"
                                            href="#"
                                            id="toggle-multi-chart-series-candlestick"
                                            role="button"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            title="Candles Chart">
                                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="410.916px" height="410.915px" viewBox="0 0 410.916 410.915" style={{ enableBackground: "new 0 0 410.916 410.915" }} xmlSpace="preserve">
                                                <path d="M410.916,375.428v22.415H0V13.072h22.413v362.355H410.916z M89.193,315.652h11.208v-50.431h10.27V145.689h-10.27V93.393H89.193v52.296H78.917v119.533h10.277V315.652z M152.69,241.872h11.207v-51.365h10.276V70.971h-10.276V19.606H152.69v51.365h-10.27v119.536h10.27V241.872z M215.727,279.229h11.207v-49.488h10.271V110.194h-10.271V56.963h-11.207v53.231h-10.276V229.73h10.276V279.229z M287.169,300.243h11.21v-49.965h10.273V130.742h-10.273V77.976h-11.21v52.767h-10.269v119.536h10.269V300.243zM360.484,242.349h11.206v-51.833h10.271V70.971H371.69V20.077h-11.206v50.895h-10.276v119.536h10.276V242.349z" />
                                            </svg>
                                        </a>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item active" href="#" data-interval="5">5s</a>
                                            <a class="dropdown-item" href="#" data-interval="10">10s</a>
                                            <a class="dropdown-item" href="#" data-interval="15">15s</a>
                                            <a class="dropdown-item" href="#" data-interval="30">30s</a>
                                            <a class="dropdown-item" href="#" data-interval="60">1m</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="chart-control-block">
                                    <a href="#" class="chart-control" title="Bollinger Bands" data-toggle="modal" data-target="#modal-indicator-mgmt">
                                        <i class="fas fa-chart-line"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="right-menu">
                            <div class="call-put-block">
                                <div class="call-put-buttons">
                                    <button id="btn-call" class="btn btn-call"><i class="fas fa-arrow-up"></i>Call</button>
                                    <button id="btn-put" class="btn btn-put"><i class="fas fa-arrow-down"></i>Put</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" id="modal-indicator-mgmt" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="false">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Indicators</h5>
                                </div>
                                <div class="modal-body">
                                    <div class="indicator-add-buttons">
                                        <button class="btn btn-indicator" data-toggle="modal" data-target="#modal-bollinger-indicator-config">
                                            Bollinger Bands
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <div class="indicators-panel">
                                        <div class="indicator">
                                            <span>bollinger 1</span>
                                            <span><i class="far fa-eye"></i><i class="fas fa-trash-alt"></i></span>
                                        </div>
                                        <div class="indicator">
                                            <span>bollinger 2</span>
                                            <span><i class="far fa-eye-slash"></i><i class="fas fa-trash-alt"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" id="modal-bollinger-indicator-config" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Bollinger Bands</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    ...
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <script src="assets/js/popper.min.js"></script>
                    <script src="assets/js/bootstrap-native-v4.min.js"></script>

                    <script src="https://cdn.amcharts.com/lib/4/core.js"></script>
                    <script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
                    <script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>
                    <script src="https://cdn.amcharts.com/lib/4/plugins/sunburst.js"></script>
                    <script src="https://cdn.amcharts.com/lib/4/plugins/rangeSelector.js"></script>

                    <script src="assets/js/main.js"></script>
                </body>
            </html>
        </Fragment>
    )
}
