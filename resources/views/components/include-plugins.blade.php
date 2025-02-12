@if($hasPlugin('tabs'))
    @push('scripts')
        <script src="{{ asset('assets/js/jquery.slim.min.js') }}"></script>
        <script src="{{ asset('assets/js/popper.min.js') }}"></script>
        <script src="{{ asset('assets/js/bootstrap.min.js') }}"></script>
    @endpush
@endif